import { Router } from 'express'
import { loginValidator, loginSchema } from './../validators/loginValidator.js'
import { registerValidator, registerSchema } from './../validators/registerValidator.js'
import { jwtValidator, jwtSchema } from '../validators/jwtValidator.js'
import { registerHandler } from '../handlers/register.js'
import { logoutHandler } from '../handlers/logout.js'
import { loginHandler } from '../handlers/login.js'
import { refreshHandler } from '../handlers/refresh.js'


const router = Router()

router.post('/login', loginSchema, loginValidator, loginHandler)

// for this use-case the validation for login and register is the same no need for another validator
router.post('/register', registerSchema, registerHandler, registerHandler)

router.post('/logout', jwtSchema, jwtValidator, logoutHandler)

router.post('/token', jwtSchema, jwtValidator, refreshHandler )

router.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Add other headers here
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS'); // Add other methods here
    res.send();
  });

export { router }
