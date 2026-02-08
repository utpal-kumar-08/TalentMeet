

import mongoose from "mongoose";
import {ENV} from "./env.js";

export const connectDB=async()=>{
    try {
        if(!ENV.DB_URL){
            throw new Error("❌DB URL is not defined")
        }
        const conn=await mongoose.connect(ENV.DB_URL)
        console.log("✅DB connected",conn.connection.host)
    } catch (error) {
        console.log("❌DB connection error",error)
        process.exit(1)
    }
}
