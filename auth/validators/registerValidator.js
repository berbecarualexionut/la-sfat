import { body, validationResult } from 'express-validator'

const schemaValidation = [
    body('email').isEmail().withMessage('Invalid email adress'),
    body('password').isLength({ min: 8 }).withMessage('password must have at least 8 characters'),
    body('verifyPassword').isLength({ min: 8 }).withMessage('verify password must have at least 8 characters'),
    body('username').isAlpha().withMessage('Invalid username')
]

const validator = (request, response, next) => {
    const err = validationResult(request)
    
    // check is original schema is validated
    if (!err.isEmpty()) {
        return response.status(400).json({ estat: "Failed validation", errors: err.array() })
    }

    if (request.body.password != request.body.verifyPassword)
        return response.status(400).json({ estat: "Password mismatched" })

    next()
}

export { validator as registerValidator, schemaValidation as registerSchema }