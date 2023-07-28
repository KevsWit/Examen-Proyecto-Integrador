const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const app = express();
const Usuario = require('../models/usuarios')

const usuariosController = {};

usuariosController.getUsuarios = async (req, res) => {
    const Usuarios = await Usuario.find();
    res.json(Usuarios);
}

usuariosController.createUsuarios = async (req, res) => {
    const UserCreate  = new Usuario(req.body);
    console.log(UserCreate);
    await UserCreate.save();
    res.json('status: usuario guardado muy bien Carlitos');
}

usuariosController.authUsuarios = async (req, res) => {
    const correo = req.body.correo;  
    const passw = req.body.psw;
    const user = await Usuario.findOne({ correo });
    if (!user) {
      return res.json({error: "Correo/Contraseña Incorrecto"})
    }
    if(user.psw !== passw){
        return res.json({error: "Correo/Contraseña Incorrecto"})
      }  
      
    res.json({sucess: 'Login Correcto', token: createToken(user)})
  };

usuariosController.getUsuarioById = async (req, res) => {
    console.log(req.params.id);
    const findUser = await Usuario.findById(req.params.id);
    res.json(findUser)
}

usuariosController.editUsuario = async (req, res) => {
    const { id } = req.params;
    const gasto = {
        nombre: req.body.nombre,
        ci: req.body.ci,
        correo: req.body.correo,
        usuario: req.body.usuario,
        role: req.body.role,
        psw: req.body.psw
    };
    await Usuario.findByIdAndUpdate(id, { $set: gasto }, { new: true });
    res.json('status: usuario actualizado MUY BIEN');
}

usuariosController.deleteUsuario = async (req, res) => {
    try {
      // Buscar el usuario por su ID
      const usuario = await Usuario.findById(req.params.id);
  
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Eliminar el usuario
      await Usuario.findByIdAndDelete(req.params.id);
  
      res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
    }
  };

  
  
// gastosController.getUsuarioEstado = async (req, res) => {
//     const estado = req.params.estado;
//     try {
//         const gastosTipo = await Gasto.find({estado:estado});
//         res.json(gastosTipo);
//     } catch (error) {
//         res.status(500).json({ message: "Error al obtener usuarios por estado." });
//     }
// }



function createToken(user){
    const tokenPayload= {
        user_id: user._id,
        user_role: user.role
    }
    return jwt.sign(tokenPayload, 'TiendaDeRopa')
}
module.exports = usuariosController;
