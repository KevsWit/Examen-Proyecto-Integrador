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
  try {
    const { correo } = req.body;

    // Verificar si el correo ya está en uso
    const existeUsuario = await VerificarUsuario(correo);
    if (existeUsuario) {
      return res.status(400).json({ error: 'El correo ya está en uso' });
    }

    // Si el correo no está en uso, creamos el nuevo usuario
    const newUser = new Usuario(req.body);
    await newUser.save();

    res.json({ message: 'Usuario guardado exitosamente' });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ error: 'Hubo un error al crear el usuario' });
  }
};

async function VerificarUsuario(correo){
  let existe = false;
  const existingUser = await Usuario.findOne({ correo });
  if (existingUser) {
    let = true
    return let
  }
  return existe
}


usuariosController.authUsuarios = async (req, res) => {
  try {
    const { correo, psw } = req.body;

    // Buscar al usuario por el correo en la base de datos
    const user = await Usuario.findOne({ correo });

    // Verificar si el usuario no existe o si la contraseña no coincide
    if (!user || user.psw !== psw) {
      return res.status(401).json({ error: "Correo/Contraseña Incorrecto" });
    }

    // Si el usuario existe y la contraseña coincide, generar un token y enviar la respuesta
    const token = createToken(user);
    res.json({ success: 'Login Correcto', token });
  } catch (error) {
    console.error('Error al autenticar el usuario:', error);
    res.status(500).json({ error: "Error al intentar iniciar sesión. Por favor, intenta nuevamente más tarde." });
  }
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





function createToken(user){
    const tokenPayload= {
        user_id: user._id,
        user_role: user.role
    }
    return jwt.sign(tokenPayload, 'TiendaDeRopa')
}
module.exports = usuariosController;
