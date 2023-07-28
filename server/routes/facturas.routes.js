const express = require('express');
const router = express.Router();
const facturasController = require('../controllers/facturas.controller');

router.post('/', facturasController.createFacturas);

module.exports = router;
