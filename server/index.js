import express from 'express';
import cors from 'cors';
import {songsRouter} from './routes/songsRoutes.js';
const app=express();
app.use(express.json());
app.use(cors());
app.use("app/songs",songsRouter);

const port=process.env.PORT || 5000;

app.listen(port,async ()=>{
    console.log("Server is up and running");
})