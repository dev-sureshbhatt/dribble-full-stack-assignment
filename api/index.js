import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import userRouter from './routes/userRouter.js'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = process.env.PORT
const Mongo_String = process.env.MONGO


app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
app.use(cookieParser({sameSite: 'none', Secure: false, httpOnly: true}))
app.use(express.json())


//start -- todisplay image files in browser
import { fileURLToPath } from 'url'
import path from 'path'
import {dirname} from 'path'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadsDirectory = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsDirectory));
//end




app.listen(PORT, ()=>{
    console.log("app listening at PORT", PORT)
})


mongoose
.connect(Mongo_String)
.then(()=> console.log("mongoose connected"))
.catch((err)=> console.log(err))




//User Router
app.use('/api', userRouter)




//error handler
//error handler
app.use((err,req,res,next)=>{
    console.log(err)
    const statusCode = err.statusCode || 500
    console.log(err.message)
    const message = "Internal server error"
    res.status(statusCode).json({
        success: false,
        message,
        responseData: null
    })
})