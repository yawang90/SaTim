import {nanoid} from 'nanoid';
import {storeSurveyExcel} from "../services/surveyService.js";

export async function uploadSurveyExcel(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const { originalname, buffer } = req.file;
        const filePath = `${nanoid()}-${originalname}`;
        const data = storeSurveyExcel(filePath, buffer, req);
        if (!data) {
            return res.status(500).json({ error: 'File upload failed' });
        }
        return res.status(201).json({ data });
    } catch (err) {
        console.error('Upload survey error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
