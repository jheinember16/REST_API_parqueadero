import { Usuario } from '../models/Usuario.js';

export default class UsuarioServicio {
  async getUsuarios() {
    return await Usuario.findAll()
  }
   
  async getUsuarioById(id) {
    return await Usuario.findByPk(id)
  } 

  async postUsuario(UsuarioDTO) {    
    const usuario = await Usuario.create(UsuarioDTO)
    return usuario;
  }
  async getUsuarioByEmail(email) {
    return await Usuario.findOne({ where: { email } });
  } 

  async updateUsuario(id, UsuarioDTO) {
    const { email, password, rol } = UsuarioDTO
    const usuario = await Usuario.findByPk(id)
    if (!usuario) throw new Error('Usuario no encontrado')

    if (email) usuario.email = email
    if (password) usuario.password = password
    if (rol) usuario.rol = rol

    await usuario.save()
    return usuario
}

  async deleteUsuario(id) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error('Usuario no encontrado')
    await usuario.destroy();
    return { message: 'Usuario eliminado' }
  }
}
