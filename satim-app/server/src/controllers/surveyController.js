import {nanoid} from 'nanoid';
import {findAllSurveys, findSurvey, storeSurveyExcel} from "../services/surveyService.js";

export async function uploadSurveyExcel(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({error: 'No file uploaded'});
        }
        const {originalname, buffer} = req.file;
        const filePath = `${nanoid()}-${originalname}`;
        const survey = storeSurveyExcel(filePath, buffer, req);
        if (!survey) {
            return res.status(500).json({error: 'File upload failed'});
        }
        res.json(survey);
    } catch (err) {
        console.error('Upload survey error:', err);
        return res.status(500).json({error: 'Internal server error'});
    }
}

export async function getSurvey(req, res) {
    const {surveyId} = req.query;
    if (!surveyId) {
        return res.status(400).json({message: 'Missing projectId'});
    }
    const survey = await findSurvey({surveyId});
    res.json(survey)
}

export const getAllSurveys = async (req, res) => {
    const {projectId} = req.query;
    if (!projectId) {
        return res.status(400).json({message: 'Missing projectId'});
    }
    const surveys = await findAllSurveys({projectId});
    res.json(surveys)
}
