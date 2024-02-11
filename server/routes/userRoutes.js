import express from 'express';
import { loginUser,registerUser,getFavourites } from '../controller/usercontroller';
import {verifyToken} from '../middleware/verifyToken.js';

const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/favorites",verifyToken,getFavourites);

export {router as userRouter};