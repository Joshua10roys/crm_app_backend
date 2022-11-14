import express from 'express';
import { checkToken, checkIdMatch, authViewOnly, authManager, authAdmin } from '../middleware/auth.js';
import {
    addUser, getUserByID, getAllUsers, updateUserById, deleteUser, changePassword,
    registerUser, loginUser, forgotPassword, resetPassword, getUsersNameAndId
} from '../controllers/usersControllers.js';


const router = express.Router();


router.post('/addUser', checkToken, authManager, addUser);

router.get('/get/:_id', checkToken, authViewOnly, getUserByID);

router.get('/getAllUsers', checkToken, authViewOnly, getAllUsers);

router.patch('/edit/:_id', checkToken, checkIdMatch, updateUserById);

router.delete('/delete/:_id', checkToken, authAdmin, deleteUser);

router.patch('/changePassword/:_id', checkToken, checkIdMatch, changePassword);


router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/forgot_password', forgotPassword);

router.post('/reset_password/:randomToken', resetPassword);


router.get('/getUserList', checkToken, authViewOnly, getUsersNameAndId);


export const usersRouter = router;