//function to Issue JWT token

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
// const privateKey = "656f56d5f6d5f65df6da6a5s6as6we65r6e5"
const privateKey = process.env.JWTSECRET

export const signJWT  = (newCreatedUser) => {
    return new Promise((resolve, reject)=>{

        jwt.sign({newCreatedUser}, privateKey, function(err, token) {
            if (token) {
                resolve(token)
            } else resolve("err")
          })


    })

}