import express from 'express'
import {USER} from '../models/userModel.js'
import { userValidationSchema } from '../utils/userValidationSchema.js'

const router = express.Router()

//validate and create new user
router.post('/users', async (req,res,next)=> {
    try {
        if (!req.body.name, !req.body.username, !req.body.email, !req.body.password) {
            //using 422 for Unprocessable Entity
            return res.status(422).json({
                "success": false,
                "message": "Required fields are missing",
                "responseData": null
            })

            
            
        }  
        
        if (req.body.name, req.body.username, req.body.email, req.body.password) {
            const {name, username, email, password} = req.body

            
            try {
                
                //validating request body and storing it in value if validation is ok
                const value = await userValidationSchema.validateAsync({name, username,email, password});
                console.log(value)
                //if validation is success, we will further check the username 
                if (value){
                    const checkUsername = await USER.findOne({username: value.username})
                console.log("username found is",checkUsername)
                if (!checkUsername) {
                    console.log("saving username")
                    const newCreatedUser = await USER.create(value)
                    console.log(newCreatedUser)
                } else return res.status(401).json({"msg": "hii"})



                }
                

                
            }
            catch (err) { 
                console.log("error validating body", err)
                
                return next(err)
            }


            console.log("outside validation")

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
        next(error)
    }
    


    
})

export default router