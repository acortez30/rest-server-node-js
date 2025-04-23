import { Schema, model } from "mongoose";

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  url: {
    type: String
  },
  role: {
    type: String,
    required: true
  },
  estatus: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
});

// Para ocultar campos como password y __v al devolver datos (opcional pero recomendado)
UsuarioSchema.methods.toJSON = function () {
  const { __v, password , ...usuario } = this.toObject();
  return usuario;
};

export default model('Usuario', UsuarioSchema);