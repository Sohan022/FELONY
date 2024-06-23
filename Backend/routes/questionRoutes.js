import express from 'express';
const router = express.Router();

import { createAndGetQuestion } from '../handlers/questionHandler.js';

router.post('/', createAndGetQuestion);

export { router as default };