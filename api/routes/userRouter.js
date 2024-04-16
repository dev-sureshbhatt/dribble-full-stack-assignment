import express from 'express'
import {USER} from '../models/userModel.js'
import { userValidationSchema } from '../utils/userValidationSchema.js'

const router = express.Router()

//validate and create new user
router.post('/users', async (req,res,next)=> {
    try {

        //if there is no required data in request body, we will return error response from here
        if (!req.body.name, !req.body.username, !req.body.email, !req.body.password) {
            //using 422 for Unprocessable Entity
            return res.status(422).json({
                "success": false,
                "message": "Required fields are missing",
                "responseData": null
            })
        }  
        
        //if there is required data in request body
        if (req.body.name, req.body.username, req.body.email, req.body.password) {
            
            
            const {name, username, email, password} = req.body
            try {
                //validating request body using Joi and storing it in validatedValue variable if validation is ok
                const validatedValue = await userValidationSchema.validateAsync({name, username,email, password});
                //if validation is success, we will further check the username 
                if (validatedValue){
                    const checkUsername = await USER.findOne({username: validatedValue.username})
                    const checkEmail = await USER.findOne({email: validatedValue.email})

                    console.log(checkUsername, "check username")
                    console.log(checkEmail, "check email")
                
                    //if the username is found, we will further save the user else we will return response from here that username exists
                if (!checkUsername && !checkEmail) {
                    const newCreatedUser = await USER.create(validatedValue)
                    if (newCreatedUser) {
                        return res.status(201).json({success:true, message: "User created successfully", responseData: newCreatedUser})
                    }
                } else 
                if (!checkEmail) {
                    return res.status(409).json({success:false, message: "Username already exists", responseData: null })

                } else

                return res.status(409).json({success:false, message: "Email already exists", responseData: null })



                }
                

                
            }
            catch (err) { 
                console.log("error validating body", err)
                return res.status(400).json({success: false, message: "Please check all the fields and try again.", responseData: null})
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