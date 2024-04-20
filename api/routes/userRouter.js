import express from "express";
import { USER } from "../models/userModel.js";
import { userValidationSchema } from "../utils/userValidationSchema.js";
import { hashAndStore } from "../utils/hashAndStore.js";
import { signJWT } from "../utils/signJWT.js";
import { verifyJWT } from "../utils/verifyJWT.js";
import multer from 'multer'
import fs from 'fs'

const router = express.Router();
const upload = multer({dest: 'api/uploads/'})






/* Route to validate and create new user (First signup flow with basic but mandatory fields: name, email, username, password) */
router.post("/users", async (req, res, next) => {
  try {
    //if there is no required data in request body, we will return error response from here
    if (
      !req.body.name || 
      !req.body.username ||
      !req.body.email ||
      !req.body.password
    ) {
      //using 422 for Unprocessable Entity
      return res.status(422).json({
        success: false,
        message: "Required fields are missing",
        responseData: null,
      });
    }

    //if there is required data in request body
    if (
      req.body.name &&
      req.body.username &&
      req.body.email &&
      req.body.password
    ) {
      const { name, username, email, password } = req.body;
      try {
        //validating request body using Joi and storing it in validatedValue variable if validation is ok
        const validatedValue = await userValidationSchema.validateAsync({
          name,
          username,
          email,
          password,
        });
        //if validation is success, we will further check the username
        if (validatedValue) {
          const checkUsername = await USER.findOne({
            username: validatedValue.username,
          });
          const checkEmail = await USER.findOne({
            email: validatedValue.email,
          });

          //if the username is found, we will further save the user else we will return response from here that username exists
          if (!checkUsername && !checkEmail) {
            //hashing password and storing in DB
            const newCreatedUser = await hashAndStore(validatedValue); //hashing password, it returns null if proess is not success
            if (newCreatedUser) {


            //when a user is created we sign a JWT
            const userToSign = {
                id: newCreatedUser.id,
                username: newCreatedUser.name
            }

            const signedToken = await signJWT(userToSign) 
            

              return res
                .status(201)
                .cookie('token', signedToken, {
                  httpOnly: true,
                  sameSite: 'none',
                  secure: true

                })
                .json({
                  success: true,
                  message: "User created successfully",
                  responseData: newCreatedUser,
                  // accessToken: signedToken
                });
            }

            // const newCreatedUser = await USER.create(validatedValue)
          } else if (!checkEmail) {
            return res
              .status(409)
              .json({
                success: false,
                message: "Username already exists",
                responseData: null,
              });
          } else
            return res
              .status(409)
              .json({
                success: false,
                message: "Email already exists",
                responseData: null,
              });
        }
      } catch (err) {
        console.log("error validating body", err);

        const message1 = err?.details[0]?.message || "Please check all the fields and try again." 
        return res
          .status(400)
          .json({
            success: false,
            message:
              message1,
            responseData: null,
          });
      }

      // return res.status(200).json({
      //     "success": true,
      //     "message": "Successful response",
      //     "responseData": {user: {
      //         name, username, email, password
      //     }    }
      // })
    }
  } catch (error) {
    console.log("inside error");
    next(error);
  }
});


/* Route to add/update profile image and location - after verifying JWT token from cookies */
router.put('/users/uploadimage', upload.single('file') , async (req,res)=>{

  try {
    if (req.cookies.token) {
      
  
      const {token} = req.cookies
       //verify JWT here, if success, then parse file based on if file is present
      const validTokenDetails = await verifyJWT(token)  
  
      if (validTokenDetails) {
  
        const { location = "" } = req.body;
        
  
        if (req.file)  {
          var filePath = ""
          const {path, originalname} = req.file
          const parts = originalname.split(".")
          const ext = parts[parts.length -1]
          const newPath = path + '.' + ext
          filePath = newPath
          fs.renameSync(path, newPath)
        }
        //need to verify token and then put this logic
    
        //if location is not provided, we will keep it empty
        
        const updatedDoc = await USER.findByIdAndUpdate(validTokenDetails.newCreatedUser.id, {location: location, profileImage: filePath})
        if (updatedDoc) {
          //sending updated data (this is not the data returned from DB after updation. These data are just to update form state in the UI)
          res.status(200).json({success: true, message: "User profile/location updated", responseData: {updateLocation: location, updatedProfileImage: filePath}})
        }
        else {
        res.status(422).json({success: false, message: "Something went wrong validating your request, please signout and try logging in again", responseData: {requestedLocationUpdate: location, requestedProfileImageUpdate: filePath}})
        }
      
  
  
  
  
  
      } else
      if (!validTokenDetails) {
        res.status(401).json({sucess: false, message: "Unauthorized or Session expired, please login to continue", responseData: {user: null}})
      }
      
  
  
    } else {
      res.status(401).json({sucess: false, message: "Unauthorized or Session expired, please login to continue", responseData: {user: null}})
    }
  
    
  } catch (error) {
    next(error)
    
  }
    
 



  
})

/* Route to update other information about the user (survey form viz what brings you to Dribble) */
router.put('/users/details', async (req,res)=>{
  
  try {
  
    if (req.cookies.token) {
      const {token} = req.cookies
      const validTokenDetails = await verifyJWT(token)
      const isValidUser = await USER.findById(validTokenDetails.newCreatedUser.id)
      const userSurveyDetails = req.body
      if (isValidUser && validTokenDetails && userSurveyDetails) {
        
        const updatedUser = await USER.findByIdAndUpdate(validTokenDetails.newCreatedUser.id, {userSurveyDetails: userSurveyDetails})
         if (updatedUser) {
          res.status(200).json({success: true, message: "User data updated", responseData: {updatedData: userSurveyDetails}})

         } else {
          res.status(500).json({success: false, message: "Couldn't update user, please try again", responseData: null})
         }
        

      } else {
        res.json(204).json({
          success: true,
          message: "User authorized but nothing to update",
          responseData: null

        })
      }
  
    } else {
      res.status(401).json({success: false, msg: "You're not authorized or Session expired, please login again"})
    }
    
  } catch (error) {
    next(error)
  }
  
})



export default router;
