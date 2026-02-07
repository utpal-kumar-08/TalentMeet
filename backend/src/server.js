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
import { ENV } from "./lib/env.js"   // ✅ FIXED PATH

const app = express()

console.log(ENV.DB_URL)
console.log(ENV.PORT)

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "success from api" })
})

app.listen(ENV.PORT, () => {
  console.log("Server is listening on PORT", ENV.PORT);
});
