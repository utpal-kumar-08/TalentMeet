// import dotenv from "dotenv"
// dotenv.config()

// import express from "express"
// import {ENV} from "./lib/env.js"
// const app=express()
// console.log(ENV.DB_URL)
// console.log(ENV.PORT)
// app.get("/health",(req,res)=>{
//     res.status(200).json({msg:"sucess from api"})
// })
// app.listen(ENV.PORT,()=>console.log("server is listening on PORT", ENV.PORT))


import dotenv from "dotenv"
dotenv.config()

import express from "express"
import path from "path"
import { ENV } from "./lib/env.js"   // ✅ FIXED PATH

const app = express()
const __dirname = path.resolve()

console.log(ENV.DB_URL)
console.log(ENV.PORT)

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

app.listen(ENV.PORT, () => {
  console.log("Server is listening on PORT", ENV.PORT);
});
