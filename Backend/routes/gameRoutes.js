import express from 'express';
const router = express.Router();

import { createGame, joinGame } from '../handlers/gameHandler.js';

router.post('/', createGame);
router.patch('/join', joinGame);

export { router as default };