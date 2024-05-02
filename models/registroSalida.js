import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { Parqueadero } from './parqueadero.js';

export const RegistroSalida = sequelize.define('registro_salida', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  parqueaderoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Parqueadero,
      key: 'id',
    },
  },
  placaVehiculo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fechaSalida: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'registro_salida',
});
