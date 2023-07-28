const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos.controller');

// Ruta para obtener todos los productos
router.get('/', productosController.getProductos);

// Ruta para crear un nuevo producto
router.post('/', productosController.createProductos);

// Ruta para obtener un producto por su RFID
router.get('/:rfid', productosController.getProducto);

// Ruta para editar un producto por su RFID
router.put('/:rfid', productosController.editProductoByRFID);

// Ruta para eliminar un producto por su RFID
router.delete('/:rfid', productosController.deleteProductoByRFID);

// Ruta para obtener productos por oferta
router.get('/oferta/:oferta', productosController.getProductosByOferta);

module.exports = router;
