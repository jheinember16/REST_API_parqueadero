import express from 'express'
import RolesService from '../services/rolesServicio.js'
import { RolesDTO } from '../dtos/rolesDTO.js'
const router = express.Router()
const rolesService  = new RolesService()

router.get('/', async (req, res) => {
  try {
    const roles = await rolesService.getRoles()
    res.json(roles)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const rol = await rolesService.getRolesById(id)
    if (!rol) {
      res.status(404).json({ message: 'Rol no encontrado' })
    } else {
      res.json(rol)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/', async (req, res) => {
  const { nombre } = req.body
  try {
    const rolesDTO = new RolesDTO(nombre)
    const rol = await rolesService.postRoles(rolesDTO)
    res.status(201).json(rol);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default router