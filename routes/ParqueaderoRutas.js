import { Router } from 'express'
import parqueaderoController from '../controllers/parqueaderoController.js'

const router = Router()

router.use('/parqueaderos', parqueaderoController)


export default router
 