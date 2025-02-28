import express from 'express';
const router = express.Router();

import { createUser, login, loginUser, logout, profile, updateProfile, deleteUser, allUsers } from '../controllers/userControllers.js';
import upload from '../middlewares/upload.js';

router.get('/user/all', allUsers);
router.get('/user/login', login);
router.get('/user/logout' , logout);

router.post('/user/create', createUser);
router.post('/user/login', loginUser);
router.post('/user/profile' , profile);

router.patch('/user/update/:email', upload.single("image"), updateProfile);
router.delete('/user/delete/:email', deleteUser);

export default router;