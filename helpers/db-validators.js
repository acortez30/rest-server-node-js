import Role from '../models/role.js';
import Usuario from '../models/usuario.js';

export const rolValido  = async (rol ='')=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
      throw new Error('El rol no esta registrado en la base de datos')
    }
}

export const emailExiste = async(email) =>{
  const existeEmail  = await Usuario.findOne({email:email})
  if(existeEmail){
      throw new Error(`El correo: ${email} ya esta registrado`)
  }
}

export const usuarioExisteById = async (id = '') => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El ID ${id} no existe`);
  }
};