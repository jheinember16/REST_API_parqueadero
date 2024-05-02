import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { Usuario } from './Usuario.js'

export const Parqueadero = sequelize.define('parqueadero', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  costoPorHora: {
    type: DataTypes.DECIMAL(10, 3), 
    allowNull: false,
  },
  socioId: { 
    type: DataTypes.INTEGER,
    allowNull: false, 
    references: {
      model: Usuario,
      key: 'id'
    },
  }
}, {
  tableName: 'parqueadero', 
});
