import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { songsRouter } from './routes/songsRoutes.js';
import { playlistRouter } from './routes/playlistRoutes.js';
import { artistRouter } from './routes/artistRoutes.js';
import { userRouter } from './routes/userRoutes.js';
import { dbconnect } from './config/dbconnection.js';

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

dbconnect();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/songs", songsRouter);
app.use("/playlists", playlistRouter);
app.use("/artists", artistRouter);
app.use("/users", userRouter);

const port = process.env.PORT || 5000;

app.listen(port, async () => {
    console.log(`Server is up and running on port: ${port}`);
});
