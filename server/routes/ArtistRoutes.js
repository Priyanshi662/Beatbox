import express from 'express';
import { getArtists, getArtistandSongs, getTopArtists } from '../controller/artistcontroller.js';

const router = express.Router();
router.get('/all', getArtists);
router.get('/top', getTopArtists);
router.get('/:id', getArtistandSongs);

export { router as artistRouter };
