import { Usuario } from '../models/Usuario.js'
import bcrypt from 'bcrypt' 
import jwt from 'jsonwebtoken'
import config from '../config.js'
import { Rol } from '../models/rol.js'

export default class AuthServicio {
  async signUp(email, password, roleId) {    
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        if (!roleId) {
            try {
                const defaultRole = await Rol.findOne({ where: { nombre: 'SOCIO' } })
                if (!defaultRole) {
                    throw new Error('No se encontró un rol predeterminado')
                }
                roleId = defaultRole.id
            } catch (error) {
                console.error('Error al buscar el rol predeterminado:', error)
                throw error
            }
        } else {
            const existingRole = await Rol.findByPk(roleId);
            if (!existingRole) {
                throw new Error('Este rol no existe');
            }
        }

        const newUsuario = await Usuario.create({
            email,
            password: hashedPassword,
            roleId
        });

        const token = jwt.sign({ id: newUsuario.id }, config.SECRET, {
            expiresIn: '6h' 
        });

        return { token };
      
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;
    }
}


  async signIn(email,password) {  

      const userFound = await Usuario.findOne({
         where: { email },
        include: Rol      
      }) 
      if (!userFound) {
        throw new Error('Usuario no encontrado');
      }

      const matchPassword = await bcrypt.compare(password, userFound.password)
      if (!matchPassword) {
        throw new Error('Contraseña incorrecta');
      }

      const token = jwt.sign({ id: userFound.id }, config.SECRET, {
        expiresIn: '6h' 
      })

      return { token }
  }    
  
}