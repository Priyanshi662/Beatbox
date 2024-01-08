import mongoose from "mongoose";
const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    favorites:{
        type:Array,
        default:[]
    },
    playlists:{
        type:Array,
        default:[]
    }
});
const User=mongoose.model("MelodyUser",UserSchema);
export default User;