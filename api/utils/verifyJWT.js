//function to verify if the provided token is valid or not

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
// const privateKey = "656f56d5f6d5f65df6da6a5s6as6we65r6e5"
const privateKey = process.env.JWTSECRET

export const verifyJWT  = (token) => {
    return new Promise((resolve, reject)=>{

        jwt.verify(token, privateKey, function(err, decoded) {
            if (decoded) {
                resolve(decoded)
            } else resolve(null)
          })


    })

}