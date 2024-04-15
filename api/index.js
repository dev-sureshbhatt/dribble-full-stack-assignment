import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import {USER} from './models/userModel.js'


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



//userrouter


app.post('/api/users', (req,res,next)=> {
    try {
        const {name, username, email, password} = req.body
        if (!name, !username, !email, !password) {
            //using 422 for Unprocessable Entity
            res.status(422).json({
                "success": false,
                "message": "Required fields are missing",
                "responseData": null
            })
        }  
        
        
    res.status(200).json({
        "success": true,
        "message": "Successful response",
        "responseData": null
    })  
    } catch (error) {
        console.log(error)
    }
    


    
} )


//error handler
