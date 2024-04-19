import jwt from 'jsonwebtoken'
const privateKey = "656f56d5f6d5f65df6da6a5s6as6we65r6e5"

export const signJWT  = (newCreatedUser) => {
    return new Promise((resolve, reject)=>{

        jwt.sign({newCreatedUser}, privateKey, function(err, token) {
            if (token) {
                resolve(token)
            } else resolve("err")
          })


    })

}