import express from 'express'
import VehiculoService from '../services/vehiculoServicio.js'
import { VehiculoDTO } from '../dtos/vehiculoDTO.js'
const vehiculoService  = new VehiculoService()
import authJWT from '../middlewares/authJWT.js'

const router = express.Router()

router.get('/',[authJWT.verifyToken, authJWT.isSocio], async (req, res) => {
  try {
    const vehiculo = await vehiculoService.getVehiculos()
    res.json(vehiculo)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/',[authJWT.verifyToken, authJWT.isSocio], async (req, res) => {
  const { placa, marca, modelo, color, parqueaderoId  } = req.body
  try {
    const vehiculoDto = new VehiculoDTO(placa, marca, modelo, color, parqueaderoId )
    const vehiculo = await vehiculoService.postVehiculo(vehiculoDto)
    res.status(201).json(vehiculo);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.get('/:id',[authJWT.verifyToken, authJWT.isSocio], async (req, res) => {
  const { id } = req.params;
  try {
    const vehiculo = await vehiculoService.getVehiculoById(id)
    if (!vehiculo) {
      res.status(404).json({ message: 'Vehiculo no encontrado' })
    } else {
      res.json(vehiculo)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.patch('/:id',[authJWT.verifyToken, authJWT.isSocio], async (req, res) => {
  const { id } = req.params
  const { placa,marca,modelo,color,parqueaderoId } = req.body
  try {
    const vehiculoDTO = new VehiculoDTO(placa,marca,modelo,color,parqueaderoId);
    const vehiculoActualizado = await vehiculoService.updateVehiculo(id, vehiculoDTO);
    res.json(vehiculoActualizado)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.delete('/:id',[authJWT.verifyToken, authJWT.isSocio], async (req, res) => {
  const { id } = req.params;
  try {
    await vehiculoService.deleteVehiculo(id)
    res.json({ message: 'Vehiculo eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/parqueadero/:id', [authJWT.verifyToken, authJWT.isAdmin, authJWT.isSocio], async (req, res) => {
  const { id } = req.params
  try {
    const vehiculos = await vehiculoService.getVehiculosPorParqueadero(id);
    res.json(vehiculos);
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})



export default router