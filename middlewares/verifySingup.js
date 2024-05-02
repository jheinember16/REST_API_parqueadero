import { Usuario } from "../models/Usuario.js"
import { Rol } from "../models/rol.js"

export const checkRolesExisted = async (req, res, next) => {
  try {
    const roles = await Rol.findAll()
    const existingRoles = roles.map(role => role.nombre)

    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!existingRoles.includes(req.body.roles[i])) {
          return res.status(400).json({
            message: `El rol ${req.body.roles[i]} no existe`
          });
        }
      }
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// export const checkDuplicateEmail = async (req, res, next) => { 

// //   if (!req.body.email) {
// //     return res.status(400).json({ message: 'El campo "email" es requerido' });
// // }
//     const usuario = await Usuario.findOne({ where: { email: req.body.email } });
    
//     if(usuario) {
//       return res.status(400).json({ message: 'El email ya existe'})
//     }

//     next()
// }

export default { checkRolesExisted }
