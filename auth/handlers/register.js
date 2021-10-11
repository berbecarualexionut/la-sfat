import User from './../models/Users.js'
import { hashPassword } from '../utils.js'

const registerHandler = async (request, response) => {
    const hashedPassword = hashPassword(request.body.password)


    try {
        const user = await User.create({
            email: request.body.email,
            password: hashedPassword,
            username: request.body.username
        })
    } catch (err) {
        if (err.errors[0].type == 'unique violation') {
            return response.status(400).json({'error': 'Duplicate email'})
        }
        return response.status(400).json({'error': 'Error at registering'})
    }

    response.json({"status": 0})
}

export { registerHandler }