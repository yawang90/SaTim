import express from "express";
import multer from 'multer';
import {
    getAllSurveys,
    getCompetences,
    getOrCreateResponse,
    getSurvey, saveAnswerToResponse,
    uploadSurveyExcel
} from "../controllers/surveyController.js";

const router = express.Router();
const upload = multer();

router.post('/create', upload.single('file'), uploadSurveyExcel);
router.get('/get', getSurvey);
router.get('/getAll', getAllSurveys)
router.get('/response/getOrCreate', getOrCreateResponse)
router.get('/competences/get', getCompetences)
router.post('/response/saveAnswer', saveAnswerToResponse)
export default router;
