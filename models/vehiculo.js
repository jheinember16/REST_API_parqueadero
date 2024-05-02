import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { Parqueadero } from './parqueadero.js';

export const Vehiculo = sequelize.define('vehiculo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  placa: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parqueaderoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Parqueadero,
      key: 'id',
    },
  },
}, {
  tableName: 'vehiculo',
});

Vehiculo.belongsTo(Parqueadero, { foreignKey: 'parqueaderoId' });
