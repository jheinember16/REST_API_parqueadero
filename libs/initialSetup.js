import { Rol } from "../models/rol.js" 

export const createRoles = async () => {
  try {
    const count = await Rol.count()
    
    if (count > 0) return
    const values = await Promise.all([
      new Rol({ nombre: "ADMIN" }).save(),
      new Rol({ nombre: "SOCIO" }).save(),
    ])
  } catch (error) {
    console.error(error)
  }
}