import { getToken } from '../database/redisConn.js'
import {generateToken, jsonwebtoken} from '../jwt/jwt.js'


const refreshHandler = (request, response) => {
    const refreshToken = request.body.token

    getToken(refreshToken, (err, data) => {
        if (err || data === null) { 
            return response.status(400).json({error: "Refresh token doesn't exist, please login!", status: 1})
        } else {
            // key exists in redis user can refresh access token
            jsonwebtoken.verify(refreshToken, process.env.REGEN_TOKEN, (err, user) => {
                if (err) return response.status(403)
                const accessToken = generateToken(user.username, user.email)
                return response.json({auth: accessToken})
            })

        }
    })
}

export { refreshHandler }