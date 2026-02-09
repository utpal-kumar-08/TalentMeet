// import express from "express"
// import {ENV} from "./lib/env.js"
// const app=express()
// console.log(ENV.DB_URL)
// console.log(ENV.PORT)
// app.get("/health",(req,res)=>{
//     res.status(200).json({msg:"sucess from api"})
// })
// app.listen(ENV.PORT,()=>console.log("server is listening on PORT", ENV.PORT))


import express from "express"
import path from "path"
import { ENV } from "./lib/env.js"   // ✅ FIXED PATH
import { connectDB } from "./lib/db.js"
import { inngest, functions } from "./lib/inngest.js"
import cors from "cors"
import {serve} from "inngest/express"
import streamRoutes from "./routes/streamRoutes.js"
import { clerkMiddleware } from "@clerk/express";

const app = express()
const __dirname = path.resolve()


app.use(cors({
  origin:ENV.CLIENT_URL,
  credentials:true
}))


// handle preflight explicitly
// app.options("*", cors());

app.use(express.json())

app.use(clerkMiddleware());


app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/stream", streamRoutes);
console.log(ENV.DB_URL)
console.log(ENV.PORT)

app.get('/',(req,res)=>{
  res.send("API IS RUNING")
});

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "success from api" })
})

app.get("/books", (req, res) => {
  res.status(200).json({ msg: "success from books" })
})

if(ENV.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname,"../frontend/dist/index.html"))
  })
}

const startServer=async()=>{
  try{
    await connectDB()
    app.listen(ENV.PORT,()=>console.log("Server is listening on PORT",ENV.PORT))
  }catch(error){
    console.log("❌Server connection error",error)
    process.exit(1)
  }
};
startServer();
