import { createClient } from '@supabase/supabase-js';
import prisma from "../config/prismaClient.js";
import * as XLSX from "xlsx";

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

export const findCompetences = async ({surveyId}) => {
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

    return result;
}