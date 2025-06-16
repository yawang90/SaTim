import express from "express";
import multer from 'multer';
import {uploadSurveyExcel} from "../controllers/surveyController.js";

const router = express.Router();
const upload = multer();

router.post('/create', upload.single('file'), uploadSurveyExcel);

export default router;
