const usuario = require('../controllers/usuarios.controller');

const express = require('express');
const router = express.Router();

/*Usuarios*/

router.get("/", usuario.getUsuarios);
router.post("/", usuario.createUsuarios);
router.put("/:id", usuario.editUsuario);
router.get("/:id", usuario.getUsuarioById);
router.delete("/:id", usuario.deleteUsuario);

module.exports = router;