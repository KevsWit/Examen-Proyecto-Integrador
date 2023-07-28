const mongoose = require('mongoose');
const { Schema } = mongoose;

const GastosSchema = new Schema({
    nombre: { type: String, required: true },
    ci: { type: String, required: true },
    correo: { type: String, required: true },
    usuario: { type: String, required: true},
    role: { type:String, required:true,},
    psw: { type: String, required: true }
});
module.exports = mongoose.model('Usuario', GastosSchema);
