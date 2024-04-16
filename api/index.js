import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import userRouter from './routes/userRouter.js'


const app = express()
const PORT =process.env.PORT
const Mongo_String = process.env.MONGO

app.use(cors())
app.use(express.json())

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
    const statusCode = err.statusCode || 500
    const rawMessage = err.message || "Internal server error"
    const messageForClient = "Something went wrong, please try again."
    res.status(statusCode).json({
        "success": "false",
        messageForClient,
        responseData: null
    })
})