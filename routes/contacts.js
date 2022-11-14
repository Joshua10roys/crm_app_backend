import express from 'express';
import { checkToken, authViewOnly, authEmployee } from '../middleware/auth.js';
import {
    createContact, getContacts, getContactsByName, getContactById,
    updateContactById, deleteContactById, getContactsNameAndId
} from '../controllers/contactController.js';


const router = express.Router();


router.post('/create', checkToken, authEmployee, createContact);

router.get('/get/:skip', checkToken, authViewOnly, getContacts);

router.get('/get/:firstname/:skip', checkToken, authViewOnly, getContactsByName);

router.get('/getById/:_id', checkToken, authViewOnly, getContactById);

router.put('/update/:_id', checkToken, authEmployee, updateContactById);

router.delete('/delete/:_id', checkToken, authEmployee, deleteContactById);

router.get('/getContactList/:name', checkToken, authViewOnly, getContactsNameAndId);


export const contactRouter = router;