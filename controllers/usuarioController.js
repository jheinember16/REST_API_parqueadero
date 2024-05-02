import express from 'express'
import UsuarioService from '../services/UsuarioServicio.js'
import { UsuarioDTO } from '../dtos/usuarioDTO.js'
import authJWT from '../middlewares/authJWT.js'

const usuarioService  = new UsuarioService()


const router = express.Router()

router.get('/',[authJWT.verifyToken, authJWT.isAdmin], async (req, res) => {
  try {
    const usuarios = await usuarioService.getUsuarios()
    res.json(usuarios)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:id',[authJWT.verifyToken, authJWT.isAdmin], async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await usuarioService.getUsuarioById(id)
    if (!usuario) {
      res.status(404).json({ message: 'Usuario no encontrado' })
    } else {
      res.json(usuario)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/',[authJWT.verifyToken, authJWT.isAdmin], async (req, res) => {
  const { email, password, roleId } = req.body
  try {
    const usuarioDTO = new UsuarioDTO(email, password, roleId)
    const usuario = await usuarioService.postUsuario(usuarioDTO)
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.patch('/:id',[authJWT.verifyToken, authJWT.isAdmin], async (req, res) => {
  const { id } = req.params;
  const { email, password, rol } = req.body;
  try {
    const usuarioDTO = new UsuarioDTO(email, password, rol);
    const usuarioActualizado = await usuarioService.updateUsuario(id, usuarioDTO);
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

router.delete('/:id',[authJWT.verifyToken, authJWT.isAdmin], async (req, res) => {
  const { id } = req.params;
  try {
    await usuarioService.deleteUsuario(id);
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

export default router