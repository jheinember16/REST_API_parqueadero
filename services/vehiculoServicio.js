import { Vehiculo } from '../models/vehiculo.js';

export default class VehiculoServicio {
    async getVehiculos() {
      return await Vehiculo.findAll()
    }    
    async getVehiculoById(id) {
      return await Vehiculo.findByPk(id)
    }
    async postVehiculo(vehiculoDTO) {    
      const vehiculo = await Vehiculo.create(vehiculoDTO)
      return vehiculo
    }
    async updateVehiculo(id, VehiculoDTO) {
      const { placa,marca,modelo,color,parqueaderoId  } = VehiculoDTO
      const vehiculo = await Vehiculo.findByPk(id)
      if (!vehiculo) throw new Error('Vehiculo no encontrado')

      
      if (placa) vehiculo.placa = placa
      if (marca) vehiculo.marca = marca
      if (modelo) vehiculo.modelo = modelo
      if (color) vehiculo.color = color
      if (parqueaderoId) vehiculo.parqueaderoId = parqueaderoId

      await vehiculo.save()
      return vehiculo
    }
    async deleteVehiculo(id) {
      const vehiculo = await Vehiculo.findByPk(id);
      if (!vehiculo) throw new Error('Vehiculo no encontrado')
      await vehiculo.destroy();
      return { message: 'Vehiculo eliminado' }
    }
    async getVehiculosPorParqueadero(parqueaderoId) {
      try {
        const vehiculos = await Vehiculo.findAll({ where: { parqueaderoId: parqueaderoId } });
        return vehiculos;
      } catch (error) {
        throw new Error('Error al obtener los vehículos del parqueadero')
      }
    }
}
