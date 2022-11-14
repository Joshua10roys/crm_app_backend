import express from 'express';
import { checkToken, authViewOnly, authEmployee } from '../middleware/auth.js';
import { getServices, getServicesByTitle, createServiceReq, getById, updateById, deleteById } from '../controllers/serviceController.js';

const router = express.Router();

router.get('/getServices/:skip', checkToken, authViewOnly, getServices)

router.get('/getServices/:title/:skip', checkToken, authViewOnly, getServicesByTitle)

router.post('/create', checkToken, authEmployee, createServiceReq)

router.get('/get/:_id', checkToken, authViewOnly, getById)

router.put('/update/:_id', checkToken, authEmployee, updateById)

router.delete('/delete/:_id', checkToken, authEmployee, deleteById)

export const serviceRouter = router;