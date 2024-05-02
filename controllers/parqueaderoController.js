import express from 'express';
import ParqueaderoService from '../services/parqueaderoServicio.js'
import { ParqueaderoDTO } from '../dtos/parqueaderoDTO.js'
import { IngresoVehiculoDTO } from '../dtos/registroEntradaDTO.js'
import { Salidadto } from '../dtos/registroSalidaDTO.js'

import authJWT from '../middlewares/authJWT.js'

const parqueaderoService = new ParqueaderoService()
const router = express.Router()

router.get('/', [authJWT.verifyToken, authJWT.isAdmin],async (req, res) => {
  try {
    const parqueaderos = await parqueaderoService.getParqueaderos();
    res.json(parqueaderos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/:id',[authJWT.verifyToken, authJWT.isAdmin], async (req, res) => {
  const { id } = req.params;
  try {
    const parqueadero = await parqueaderoService.getParqueaderoById(id)
    if (!parqueadero) {
      res.status(404).json({ message: 'Parqueadero no encontrado' })
    } else {
      res.json(parqueadero)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.post('/',[authJWT.verifyToken, authJWT.isAdmin], async (req, res) => {
  const { nombre, capacidad, costoPorHora, socioId } = req.body;
  try {
    const parqueaderoDTO = new ParqueaderoDTO(nombre, capacidad, costoPorHora, socioId);
    const parqueadero = await parqueaderoService.postParqueadero(parqueaderoDTO);
    res.status(201).json(parqueadero);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})
router.patch('/:id',[authJWT.verifyToken, authJWT.isAdmin], async (req, res) => {
  const { id } = req.params;
  const { nombre, capacidad, costoPorHora, socioId } = req.body;
  try {
    const parqueaderoDTO = new ParqueaderoDTO(nombre, capacidad, costoPorHora, socioId);
    const parqueaderoActualizado = await parqueaderoService.updateParqueadero(id, parqueaderoDTO);
    res.json(parqueaderoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})
router.delete('/:id',[authJWT.verifyToken, authJWT.isAdmin], async (req, res) => {
  const { id } = req.params;
  try {
    await parqueaderoService.deleteParqueadero(id);
    res.json({ message: 'Parqueadero eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})
router.post('/:id/ingreso', async (req, res) => {
  const { id } = req.params;
  const { placa } = req.body;
  try {
    const ingresoVehiculoDTO = new IngresoVehiculoDTO(placa);
    const resultado = await parqueaderoService.registrarEntrada(id, ingresoVehiculoDTO);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})
router.post('/:id/salida', async (req, res) => {
  const { id } = req.params;
  const { placa } = req.body;
  try {
    const salidaVehiculoDTO = new Salidadto(placa)
    const resultado = await parqueaderoService.registrarSalida(id, salidaVehiculoDTO);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



export default router
