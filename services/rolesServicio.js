import { Rol } from '../models/rol.js'

export default class RolesServicio {
  async getRoles() {
    return await Rol.findAll()
  }

  async getRolesById(id) {
    return await Rol.findByPk(id)
  }

  async postRoles(rolesDTO) {    
    const rol = await Rol.create(rolesDTO)
    return rol
  }
}

