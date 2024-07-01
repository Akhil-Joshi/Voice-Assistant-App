import {config} from "dotenv"
config({  path: "./.env",});
import express from "express";
import { connectDB } from "./connection/connectDB.js";
import { errorMiddleWare } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import cors from "cors"
import {v2 as cloudnary} from "cloudinary"



export const adminSceretKey =
process.env.ADMIN_SCERET_KEY || "WolloAdmin Aaryan Baral";
const app = express();
connectDB(process.env.MONGO_URI);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:5173","http://localhost:4173",process.env.CURRENT_URL],
    credentials:true
}))
cloudnary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
  })

const PORT = process.env.PORT || 3000
app.get("/", (req, res) => {
    res.send("hellow world");
});
app.use("/api/v1/user", userRoute);




app.use(errorMiddleWare);
app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);
})

