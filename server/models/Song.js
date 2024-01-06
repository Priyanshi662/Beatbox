import mongoose from 'mongoose';
const SongSchema = new mongoose.Schema({
    title:{
        Name:String,
        required:true
    },
    duration:{
        type:String,
        required
    }
})