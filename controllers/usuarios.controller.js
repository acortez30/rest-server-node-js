import {response,request} from 'express'

export const getUsers = (req = request, res = response) => {
    const { q, nombre = "Not name", apikey } = req.query;
    res.json({ 
        msg: 'GET usuarios',
        q, 
        nombre,
        apikey
    });
};  

export const postUser = (req = request, res = response) => {
    const { nombre, edad } = req.body;
    console.log('Nombre',nombre);
    console.log('Edad',edad)
    res.status(201).json({
      msg: 'POST usuario',
      nombre ,edad
    });
};
  
export const putUser = (req, res) => {
    const { id } = req.params;
    res.json({ 
        msg: 'PUT usuario',
        id
    });
};
  
export const deleteUser = (req, res) => {
    const { id } = req.params;
    res.json({ 
        msg: 'DELETE usuario' ,
        id
    });
};
  
export const patchUser = (req, res) => {
    const { id } = req.params;
    res.json({ 
        msg: 'PATCH usuario' ,
        id
    });
};