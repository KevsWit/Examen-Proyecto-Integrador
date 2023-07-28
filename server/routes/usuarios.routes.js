const user = require('../controllers/usuarios.controller');
const express = require('express');
const router = express.Router();

router.post('/', user.authUsuarios);
module.exports = router;