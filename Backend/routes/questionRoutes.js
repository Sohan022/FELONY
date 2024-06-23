import express from 'express';
const router = express.Router();

import { createAndGetQuestion, getQuestion, getNextQuestion } from '../handlers/questionHandler.js';

router.post('/', createAndGetQuestion);
router.get('/:questionId', getQuestion);
router.get('/next/new', getNextQuestion);

export { router as default };