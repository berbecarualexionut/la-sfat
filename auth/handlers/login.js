// This file is processing all the login for the /login endpoint
import {generateToken, generateRefreshToken} from './../jwt/jwt.js'
import User from '../models/Users.js'
import { hashPassword } from '../utils.js'
import { addRefreshToken } from '../database/redisConn.js'

const loginHandler = async (request, response) => {
    const userEmail = request.body.email
    const password = request.body.password

    const hashedPass = hashPassword(password)

    const user = await User.findOne({where: {email: userEmail, password: hashedPass}})
        .catch((error) => {
            console.log(error)
        })

    if (user) {

        const accessToken = generateToken(user.username, userEmail)
        const refreshToken = generateRefreshToken(user.username, userEmail)

        addRefreshToken(refreshToken, (_, resp) => {
            if (resp == 1) {
                response.json({acces: accessToken, refresh: refreshToken})        
            } else {
                response.status(500).json({error: "Failed to save refresh key"})
            }
        })

        response.json({auth: accessToken, refresh: refreshToken, username: user.username})

    } else {
        return response.status(403).json({error: "Invalid email/password combination"})
    }

}

export { loginHandler }