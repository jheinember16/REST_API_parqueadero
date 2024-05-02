import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { Parqueadero } from './parqueadero.js';

export const RegistroEntrada = sequelize.define('registro_entrada', {
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
  fechaEntrada: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'registro_entrada',
});
