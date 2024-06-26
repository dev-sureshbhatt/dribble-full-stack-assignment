import mongoose from 'mongoose'
import { userDetailsSchema } from './surveyModel.js'


//User Schema Here
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // Validate email format using a regex pattern
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // need to keep the validation regex same in JOI, database and frontend
    },
    password: {
        type: String,
        required: true,
        // minlength: 6 not using this since we will store hashed password here
    },
    location: {
        type: String,
        default: ""
    },
    profileImage: {
        type: String,
        default: ""
    },
    userSurveyDetails: {
        type: userDetailsSchema,
        default: {}
    }


})

export const USER = mongoose.model('User', userSchema)