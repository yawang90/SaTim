import express from "express";
import multer from 'multer';
import {
    getAllSurveys, getCompetenceExcel,
    getCompetences, getEnrichedResponsesBySurvey,
    getOrCreateResponse, getResponseExcel, getResponsesBySurvey,
    getSurvey, saveAnswerToResponse,
    uploadSurveyExcel
} from "../controllers/surveyController.js";

const router = express.Router();
const upload = multer();

router.post('/create', upload.single('file'), uploadSurveyExcel);
router.get('/get', getSurvey);
router.get('/getAll', getAllSurveys)
router.get('/competences/get', getCompetences)
router.get('/response/getOrCreate', getOrCreateResponse)
router.get('/response/get', getResponsesBySurvey)
router.get('/response/enriched/get', getEnrichedResponsesBySurvey)
router.post('/response/saveAnswer', saveAnswerToResponse)
router.get('/response/excel/get', getResponseExcel)
router.get('/competences/excel/get', getCompetenceExcel)

export default router;
