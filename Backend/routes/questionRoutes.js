import express from 'express';
const router = express.Router();

import { createAndGetQuestion, getQuestion } from '../handlers/questionHandler.js';

router.post('/', createAndGetQuestion);
router.get('/:questionId', getQuestion);

export { router as default };