import {findAllSurveys, findCompetences, findSurvey, storeSurveyExcel} from "../services/surveyService.js";
import {nanoid} from 'nanoid';
import * as XLSX from 'xlsx';

export async function uploadSurveyExcel(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({error: 'No file uploaded'});
        }

        const {originalname, buffer} = req.file;
        const modifiedBuffer = addUniqueTechnicalId(buffer);
        const filePath = `${nanoid()}-${originalname}`;
        const survey = await storeSurveyExcel(filePath, modifiedBuffer, req);

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

export const getOrCreateResponse = async (req, res) => {

}

export const addUniqueTechnicalId = (buffer) => {
    const workbook = XLSX.read(buffer, {type: 'buffer'});
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const json = XLSX.utils.sheet_to_json(worksheet);

    const updated = json.map((row) => ({
        _tech_id: nanoid(),
        ...row
    }));

    const newWorksheet = XLSX.utils.json_to_sheet(updated);

    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, sheetName);

    const modifiedBuffer = XLSX.write(newWorkbook, {type: 'buffer', bookType: 'xlsx'});
    return modifiedBuffer;
}

export const getCompetences = async (req, res) => {
    const {surveyId} = req.query;
    if (!surveyId) {
        return res.status(400).json({message: 'Missing surveyId'});
    }
    const competences = await findCompetences({surveyId});
    res.json(competences)
}