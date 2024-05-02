import jwt from "jsonwebtoken"
import config from '../config.js'
import { Usuario } from "../models/Usuario.js"
import { Rol } from "../models/rol.js"

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"]

    if(!token) return res.status(403).json({message:"Token no proporcionado "})

    const tok = jwt.verify(token,config.SECRET)
    req.userId = tok.id

    const usuario = await Usuario.findByPk(req.userId, { password: 0})
    if(!usuario) return res.status(404).json({message:"Usuario no encontrado"})

  next()
    
  } catch(error){
    return res.status(401).json({message:"Usuario sin permisos"})
  }
}
export const isSocio = async (req, res, next) => {
  try {
    const user = await Usuario.findByPk(req.userId, { include: Rol });
      
    if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });       
    }
    const userRole = user.Rol

    if (!userRole || userRole.nombre !== "SOCIO") {
        return res.status(403).json({ message: "Requiere Rol de Socio!" });
    }

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


export const isAdmin = async (req, res, next) => {
  try {
    const user = await Usuario.findByPk(req.userId, { include: Rol })
      
    if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" })    
    }

    const userRole = user.Rol

    if (!userRole || userRole.nombre !== "ADMIN") {
        return res.status(403).json({ message: "Requiere Rol de ADMIN!" })
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}


export default { verifyToken, isSocio, isAdmin }




