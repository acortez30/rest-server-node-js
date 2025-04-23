import {response,request} from 'express';
import bcrypt from 'bcryptjs';
import Usuario from '../models/usuario.js';
import { validationResult } from 'express-validator';

export const getUsers = async(req = request, res = response) => {
    const {limite =5, desde=0} = req.query;
    // se tarda mas
    // const usuarios = await Usuario.find({estatus:true})
    //     .skip(parseInt(desde))
    //     .limit(parseInt(limite));
    // const total = await Usuario.countDocuments({estatus:true});

    const [usuarios,total] = await Promise.all([
        Usuario.find({estatus:true}).skip(parseInt(desde)).limit(parseInt(limite)),
        Usuario.countDocuments({estatus:true})
    ])
    res.json({
        total,
        usuarios
    });
};  

export const postUser = async(req = request, res = response) => {



    const {nombre, email, password, role} = req.body;
    const usuario = new Usuario({
        nombre,
        email, 
        password,
        role
    });

    //Verificar si el correo existe
    const existEmail = await Usuario.findOne({email:email})
    if(existEmail){
        return res.status(400).json({
            msg:'El correo ya esta registrado'
        })
    }


    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync(password, salt)

    //Guardar la contraseña
    await usuario.save();
    res.status(201).json({
      usuario
    });
};
  
export const putUser = async(req, res) => {
    const { id } = req.params;
    const { _id, password, google, email, ...data } = req.body;
    if(password){
        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync()
        data.password = bcrypt.hashSync(password, salt)
    }

    const userDb = await Usuario.findByIdAndUpdate(id,data)
    res.json({ 
        msg: 'PUT usuario',
        userDb
    });
};
  
export const deleteUser = async(req, res) => {
    const { id } = req.params;

    //FISICAMENTE SE BORRARA
    // const usuario = await Usuario.findByIdAndDelete(id)

    //SE BORRA CORRECTAMENTE
    const usuario = await Usuario.findByIdAndUpdate(id, {estatus:false})



    res.json({ 
        msg: 'DELETE usuario' ,
        usuario
    });
};
  
export const patchUser = (req, res) => {
    const { id } = req.params;
    res.json({ 
        msg: 'PATCH usuario' ,
        id
    });
};