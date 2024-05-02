import { Router } from 'express'
import rolesController from '../controllers/rolesController.js'

const router = Router()

router.use('/roles', rolesController)

export default router
