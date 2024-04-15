import express from 'express'
import {USER} from '../models/userModel.js'

const router = express.Router()

//validate and create new user
router.post('/users', async (req,res,next)=> {
    try {
        const {name, username, email, password} = req.body
        if (!name, !username, !email, !password) {
            console.log("inside required missing fields")
            //using 422 for Unprocessable Entity
            return res.status(422).json({
                "success": false,
                "message": "Required fields are missing",
                "responseData": null
            })
            
        }  
        
        if (name, username, email, password) {

            const totalUsers = await USER.countDocuments()
            console.log(totalUsers)

            return res.status(200).json({
                "success": true,
                "message": "Successful response",
                "responseData": {user: {
                    name, username, email, password
                }    } 
            })  

        }

    
    } catch (error) {
        console.log("inside error")
        console.log(error)
        return res.status(500).json({
            "success": false,
            "message": "Something went wrong on our servers. Please try again. If the problem persists, please try again after some time, we apologize for the inconvenience caused",
            "responseData": null
        })
    }
    


    
})

export default router