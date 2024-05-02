import { Router } from 'express'
import vehiculoController from '../controllers/vehiculoController.js'

const router = Router()

router.use('/vehiculos', vehiculoController)

export default router