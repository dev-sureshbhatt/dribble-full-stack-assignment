import express from "express";
import { USER } from "../models/userModel.js";
import { userValidationSchema } from "../utils/userValidationSchema.js";
import { hashAndStore } from "../utils/hashAndStore.js";
import { signJWT } from "../utils/signJWT.js";

const router = express.Router();

//validate and create new user
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
                .cookie('token', signedToken, {})
                .json({
                  success: true,
                  message: "User created successfully",
                  responseData: newCreatedUser,
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
        return res
          .status(400)
          .json({
            success: false,
            message:
              err.details[0].message ||
              "Please check all the fields and try again.",
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

export default router;
