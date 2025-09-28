require("dotenv").config();
const mongoose = require("mongoose");

const mongoUri = process.env.MONGO_URI;

const connectDB = async()=> {
    try{
        await mongoose.connect(mongoUri);
        console.log(`DB is connected`);
    } catch(err){
        console.log(`DB is not connected`);
        process.exit(1);
    }
}

module.exports = connectDB;