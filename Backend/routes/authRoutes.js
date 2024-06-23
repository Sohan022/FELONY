import express from 'express';
const router = express.Router();

import {
    signup,
    signin
} from '../handlers/authHandler.js'

router.post('/signup', signup);
router.post('/signin', signin);

export { router as default };