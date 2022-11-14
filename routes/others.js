import express from 'express';
import { checkToken } from '../middleware/auth.js';
import { getDocCounts } from '../controllers/otherControllers.js';


const router = express.Router();


router.get('/counts', checkToken, getDocCounts)


export const otherRouter = router;