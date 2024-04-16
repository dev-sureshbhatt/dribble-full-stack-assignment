//file that handles password hashing and storing user to db
import bcrypt from 'bcryptjs'
import { USER } from '../models/userModel.js'

export const hashAndStore = async (userDetails) => {

    return new Promise((resolve, reject)=>{

    
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(userDetails.password, salt, async function(err, hash) {
            
            if (hash) {
                const newCreatedUser = await USER.create({name:userDetails.name, username: userDetails.username, email:userDetails.email, password: hash})
                resolve(newCreatedUser)

            
                
            } else if (err) {
                console.log("something went wrong creating hash", err)
                reject(err)
            }
        });
    })

    })


    
}
