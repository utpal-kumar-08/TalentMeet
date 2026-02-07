import mongoose from "mongoose";
import {ENV} from "./env.js";
export const connectDB=async()=>{
    try {
        const conn=await mongoose.connect(ENV.DB_URL)
        console.log("✅DB connected",conn.connection.host)
    } catch (error) {
        console.log("❌DB connection error",error)
        process.exit(1)
    }
}
