import express from 'express';
import {getAllSongs,getNewReleases,getRandomSongs,
    likeSong,
    getAroundYou,
    topSongs} from '../controller/songscontroller.js';
import {verifyToken} from '../middleware/verifyToken.js';

const router= express.Router();
router.get("/",getAllSongs);
router.get("/releases",getNewReleases);
router.get("/random",getRandomSongs);
router.patch("/like/:id",verifyToken,likeSong);
router.get('/popular',getAroundYou);
router.get("/top",topSongs);

export {router as songsRouter};