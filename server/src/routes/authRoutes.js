import express from 'express';
import { loginUserController, logoutUserController, profileCheck, registerUserController, sentOtpController, verifyOtpController } from '../controllers/authControllers.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';
import verifyToken from '../middleware/authMiddleware.js';


const authRoutes = express.Router();  // Creating the router

//authRoutes.post('/login', );
authRoutes.post('/register', asyncWrapper(registerUserController) );
authRoutes.post('/login', asyncWrapper(loginUserController) );
authRoutes.get('/profile',verifyToken(), asyncWrapper(profileCheck) );
authRoutes.post('/logout', asyncWrapper(logoutUserController) );
authRoutes.post('/sendotp', verifyToken(),asyncWrapper(sentOtpController) );
authRoutes.post('/verifyotp',verifyToken(), asyncWrapper(verifyOtpController) );





export default authRoutes;  // Export the routes