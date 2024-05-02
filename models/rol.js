import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

export const Rol = sequelize.define('Rol', {
  nombre: {
    type: DataTypes.STRING,
    unique: true
  }
}, {
  tableName: 'rol'
});



