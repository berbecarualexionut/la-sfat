import express from 'express'
import { router } from './routes/router.js'
import cors from 'cors'

const webapp = express()
webapp.use(cors()) 

webapp.use(express.json())
webapp.use(router)

export { webapp }