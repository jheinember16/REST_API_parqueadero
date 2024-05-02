import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'
import { Rol } from './rol.js'

export const Usuario = sequelize.define('usuario', {
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  roleId: { 
    type: DataTypes.INTEGER,
    references: { 
      model: Rol,
      key: 'id'
    }
  }
}, {
  tableName: 'usuario', 
})

Usuario.belongsTo(Rol, { foreignKey: 'roleId' })