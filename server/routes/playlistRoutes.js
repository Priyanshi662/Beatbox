import express from 'express';
import { createplaylist,editPlaylist,getPlaylist,getPlaylists } from '../controller/playlistcontroller.js';
import {verifyToken} from '../middleware/verifyToken.js';

const router= express.Router();
router.get('/all',getPlaylists);
router.get('/:id',getPlaylist);
router.post('/create',verifyToken,createplaylist);
router.post('/:id',verifyToken,editPlaylist);

export {router as playlistRouter};