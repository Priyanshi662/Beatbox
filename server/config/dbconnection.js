import mongoose from 'mongoose';
export const dbconnect= async () =>
{
    try{
        const connect= await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);
        console.log("database connected");
    }
    catch(error)
    {
        console.log("Error in db connection");
        process.exit(1);
    }
}