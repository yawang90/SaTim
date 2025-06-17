import { createClient } from '@supabase/supabase-js';
import prisma from "../config/prismaClient.js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
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

    const fileUrl = `${supabaseUrl}/storage/v1/object/public/${data.path}`;
    const project = Number(req.body.projectId);

    const survey = await prisma.survey.create({
        data: {
            title: req.body.title || 'Untitled Survey',
            description: req.body.description || '',
            excelFileUrl: fileUrl,
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