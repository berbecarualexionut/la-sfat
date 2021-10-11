import jsonwebtoken from "jsonwebtoken"

const generateToken = (username, email) => {
    return jsonwebtoken.sign({username:username, email: email}, process.env.SECRET_TOKEN, { expiresIn: 120 })
}

// expiration for the refreshToken will be managed in Redis
const generateRefreshToken = (username, email) => {
    return jsonwebtoken.sign({username:username, email: email}, process.env.REGEN_TOKEN)
}

export { generateToken, generateRefreshToken, jsonwebtoken }