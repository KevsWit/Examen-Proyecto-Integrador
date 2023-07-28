const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define un esquema para los productos dentro de la factura
const ProductoSchema = new Schema({
  descripcion: { type: String, required: true },
  unidades: { type: Number, required: true },
  valor_unitario: { type: Number, required: true },
  valor_final: { type: Number, required: true }
});

const FacturaSchema = new Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  telefono: { type: String, required: true },
  dir: { type: String, required: true },
  fecha: { type: String, required: true },
  cedula: { type: Number, required: true },
  productos: [ProductoSchema], // Array de productos dentro de la factura
  valor_total: { type: Number, required: true }
});

module.exports = mongoose.model('Factura', FacturaSchema);