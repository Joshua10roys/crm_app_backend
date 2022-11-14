import express from 'express';
import { checkToken, authViewOnly, authEmployee } from '../middleware/auth.js';
import {
    getLeads, getLeadsByTitle, createLead, getLeadById,
    updateById, deleteById
} from '../controllers/leadController.js';

const router = express.Router();

router.get('/getLeads/:skip', checkToken, authViewOnly, getLeads)

router.get('/getLeads/:title/:skip', checkToken, authViewOnly, getLeadsByTitle)

router.post('/create', checkToken, authEmployee, createLead)

router.get('/get/:_id', checkToken, authViewOnly, getLeadById)

router.put('/update/:_id', checkToken, authEmployee, updateById)

router.delete('/delete/:_id', checkToken, authEmployee, deleteById)

export const leadsRouter = router;