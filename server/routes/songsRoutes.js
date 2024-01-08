import express from 'express';
import {getAllSongs} from '../controller/songscontroller.js';

const router= express.Router();
router.get("/",getAllSongs);
export {router as songsRouter};