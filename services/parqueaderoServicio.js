import { Parqueadero } from '../models/parqueadero.js'
import { RegistroEntrada } from '../models/registroEntrada.js'

export default class ParqueaderoServicio {
  async getParqueaderos() {
    return await Parqueadero.findAll();
  }
  async getParqueaderoById(id) {
    return await Parqueadero.findByPk(id);
  }
  async postParqueadero(parqueaderoDTO) {
    try {
      const parqueadero = await Parqueadero.create(parqueaderoDTO);
      return parqueadero;
    } catch (error) {
      throw new Error('No se pudo crear el parqueadero.');
    }
  }
  async updateParqueadero(id, ParqueaderoDTO) {
    const { nombre, capacidad, costoPorHora,socioId  } = ParqueaderoDTO
    const parqueadero = await Parqueadero.findByPk(id)
    if (!parqueadero) throw new Error('Parqueadero no encontrado')

    
    if (nombre) parqueadero.nombre = nombre
    if (capacidad) parqueadero.capacidad = capacidad
    if (costoPorHora) parqueadero.costoPorHora = costoPorHora
    if (socioId) parqueadero.socioId = socioId

    await parqueadero.save()
    return parqueadero
}
  async deleteParqueadero(id) {
    const parqueadero = await Parqueadero.findByPk(id);
    if (!parqueadero) throw new Error('Parqueadero no encontrado')
    await parqueadero.destroy();
    return { message: 'Parqueadero eliminado' };
  }

  async registrarEntrada(id, IngresoVehiculoDTO) {
    const { placa } = IngresoVehiculoDTO;
    try {
      const parqueadero = await Parqueadero.findByPk(id);
      if (!parqueadero) throw new Error('Parqueadero no encontrado')
      if (parqueadero.capacidad === 0) {
        throw new Error('No hay espacio disponible en el parqueadero')
      }
      
      const nuevaEntrada = await RegistroEntrada.create({
        parqueaderoId: parqueadero.id,
        placaVehiculo: placa,
    })
      parqueadero.capacidad--;
      await parqueadero.save();
      
      return { message: 'Ingreso registrado exitosamente' };
    } catch (error) {
      throw new Error(`Error al registrar el ingreso del vehículo: ${error.message}`)
    }
  }
  async getEntradas() {
    try {
      const entradas = await RegistroEntrada.findAll();
      return entradas;
    } catch (error) {
      throw new Error('Error al consultar las entradas');
    }
  }

  async registrarSalida(id, SalidaVehiculoDTO) {
    const { placa } = SalidaVehiculoDTO;
    try {
      const registroEntrada = await RegistroEntrada.findOne({ 
        where: { parqueaderoId: id, placaVehiculo: placa },
        include: [{ model: Parqueadero }] 
      })
  
      if (!registroEntrada) {
        throw new Error('El vehículo no tiene una entrada registrada en este parqueadero.');
      }
  
      await registroEntrada.destroy()

      registroEntrada.Parqueadero.capacidad++
      await registroEntrada.Parqueadero.save()
  
      return { message: 'Salida registrada exitosamente' }
    } catch (error) {
      throw new Error(`Error al registrar la salida del vehículo: ${error.message}`)
    }
  }
  

  
}