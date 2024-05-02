import express from 'express'
import AuthService from "../services/authServicio.js"

const router = express.Router()

const authService  = new AuthService()

router.post('/signup', async (req, res) => {
  try {
    const { email, password, roleId } = req.body;
    const auth = await authService.signUp(email, password, roleId)
    res.status(200).json(auth);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.post('/signin', async (req, res) => {
  try {
    const { email, password  } = req.body; 
    const auth = await authService.signIn(email, password ); 
    res.json(auth);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router