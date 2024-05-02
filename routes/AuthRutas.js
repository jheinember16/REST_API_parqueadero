import { Router } from 'express'
import authCtrl from "../controllers/authController.js"

import verifySingup from '../middlewares/verifySingup.js'

const router = Router()

router.use('/up', authCtrl)
router.use('/in', authCtrl)

export default router;
 