import express from "express";
import multer from 'multer';
import {getAllSurveys, getSurvey, uploadSurveyExcel} from "../controllers/surveyController.js";

const router = express.Router();
const upload = multer();

router.post('/create', upload.single('file'), uploadSurveyExcel);
router.get('/get', getSurvey);
router.get('/getAll', getAllSurveys)
export default router;
