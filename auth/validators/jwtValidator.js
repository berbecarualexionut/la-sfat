import { body, validationResult } from 'express-validator'

const jwtSchema = [
    body('token').isJWT().withMessage('Token is invalid'),
]

const validator = (request, response, next) => {
    const err = validationResult(request)
    
    // check is original schema is validated
    if (!err.isEmpty()) {
       return response.status(400).json({ estat: "Bad request! Invalid token", errors: err.array() })
    }

    next()
}

export { jwtSchema, validator as jwtValidator }