import express from 'express';
import { loginUser, logoutUser, refreshToken } from '../controllers/loginUser.js';
import { registerStudent } from '../controllers/studentController.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', registerStudent);
router.post('/logout', logoutUser);
router.post('/refresh', refreshToken);

export default router;