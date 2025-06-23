import { createClient } from '@supabase/supabase-js';
import prisma from "../config/prismaClient.js";
import * as XLSX from "xlsx";
import ExcelJS from 'exceljs';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseBucket = process.env.SUPABASE_BUCKET;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export const storeSurveyExcel = async (filePath, fileBuffer, req) => {
    const { data, error } = await supabase.storage
        .from(process.env.SUPABASE_BUCKET)
        .upload(filePath, fileBuffer, {
            cacheControl: '3600',
            upsert: false,
            contentType: req.file.mimetype,
        });

    if (error) {
        console.error('Supabase upload error:', error);
        return null;
    }
    const project = Number(req.body.projectId);

    const survey = await prisma.survey.create({
        data: {
            title: req.body.title || 'Untitled Survey',
            description: req.body.description || '',
            excelFileUrl: filePath,
            projectId: project
        },
    });
    return survey;
};

export const findSurvey = async ({surveyId}) => {
    return prisma.survey.findFirst({
        where: {
            id: surveyId
        }
    });
}

export const findAllSurveys = async ({projectId}) => {
    const project = Number(projectId);

    return prisma.survey.findMany({
        where: {
            projectId: project
        }
    });
}

export const findOrCreateResponse = async({userId, surveyId}) => {
    const user = Number(userId);

    const existingResponse = await prisma.response.findFirst({
        where: {
            surveyId: surveyId,
            userId: user,
        },
        include: {
            questions: true,
        },
    });

    if (existingResponse) {
        return existingResponse;
    }

    const newResponse = await prisma.response.create({
        data: {
            survey: {
                connect: { id: surveyId },
            },
            user: { connect: { id: user } },
        },
        include: {
            questions: true,
        },
    });

    return newResponse;
}

export const getResponses = async({surveyId}) => {
    const existingResponses = await prisma.response.findMany({
        where: {
            surveyId: surveyId,
        },
        include: {
            questions: true,
        },
    });
    return existingResponses;
}

export const getEnrichedResponses = async ({surveyId, responseId}) => {
    const surveyRows = await getSurveyData(surveyId);
    const response = await prisma.response.findFirst({
        where: {
            id: responseId,
            surveyId: surveyId,
        },
        include: {
            questions: true,
        },
    });
    const result = []
    response.questions.forEach((question) => {
        const resultQuestion = {};
        const competencesFromIndex = surveyRows[0].findIndex((cell) => {
            return String(cell).includes(question.competencesFrom);
        });
        const competencesToIndex = surveyRows[0].findIndex((cell) => {
            return String(cell).includes(question.competencesTo);
        });

        if (competencesFromIndex !== -1) {
            resultQuestion.competencesFromId = question.competencesFrom;
            resultQuestion.competencesFrom = surveyRows[2][competencesFromIndex];
        }
        if (competencesToIndex !== -1) {
            resultQuestion.competencesToId = question.competencesTo;
            resultQuestion.competencesTo = surveyRows[2][competencesToIndex];
        }
        resultQuestion.answer = question.answer;
        result.push(resultQuestion);
    });
    return result;
};

async function getSurveyData(surveyId) {
    const survey = await findSurvey(surveyId)
    if (!survey.excelFileUrl) {
        throw new Error('Failed to fetch Excel URL from Prisma');
    }
    const fileUrl = await getExcelURLFromSupabase(survey.excelFileUrl);
    const excelFile = await fetch(fileUrl);
    if (!excelFile.ok) {
        throw new Error('Failed to fetch Excel file from Supabase');
    }
    const buffer = await excelFile.arrayBuffer();
    const result = extractRows(buffer, 4);
    const rows = Object.values(result);
    return rows;
}

export const findCompetences = async ({surveyId}) => {
    const rows = await getSurveyData(surveyId);
    const merged = rows[0].map((_, index) => {
        return rows.reduce((acc, row, colIndex) => {
            acc[`col${colIndex + 1}`] = row[index];
            return acc;
        }, {});
    });
    return merged;
}

export const saveAnswer = async ({responseId, answer, competencesFrom, competencesTo}) => {
    const question = await prisma.question.create({
        data: {
            response: { connect: { id: responseId } },
            answer,
            competencesFrom: Array.isArray(competencesFrom) ? competencesFrom : [competencesFrom],
            competencesTo: Array.isArray(competencesTo) ? competencesTo : [competencesTo]
        },
    });
    return question;
}

export const createExcelFromResponse = async ({responseId}) => {
    const response = await prisma.response.findFirst({
        where: {
            id: responseId
        },
        include: {
            questions: true,
        },
    });
    const competencesRows = await getSurveyData(response.surveyId);
    const ids = competencesRows[0];
    const competencesIds = competencesRows[1];

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Matrix');
    sheet.addRow(['', ...competencesIds]);

    ids.forEach((rowId) => {
        const index = ids.indexOf(rowId);
        const rowValues = [competencesIds[index]];

        ids.forEach((colId) => {
            const match = response.questions.some((q) =>
                q.competencesFrom.includes(rowId) && q.competencesTo.includes(colId) && q.answer === 'Ja'
            );
            rowValues.push(match ? 1 : 0);
        });

        sheet.addRow(rowValues);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}

function extractRows(buffer, numberRows) {
    const workbook = XLSX.read(buffer, {type: 'buffer'});
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(worksheet, {header: 1});

    const headers = rows[0].slice(0, numberRows);
    const result = {};

    headers.forEach((header, index) => {
        result[header] = rows.slice(1).map(row => row[index]);
    });
    return result;
}

async function getExcelURLFromSupabase(filePath) {
    const {data: signedUrlData, error: signedUrlError} = await supabase.storage
        .from(supabaseBucket)
        .createSignedUrl(filePath, 60 * 7 * 24);

    if (signedUrlError) {
        console.log(signedUrlError);
        throw new Error("Signed URL error");
    }
    const fileUrl = signedUrlData.signedUrl;
    return fileUrl;
}
