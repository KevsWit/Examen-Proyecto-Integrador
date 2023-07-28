const mongoose=require('mongoose');
const {Schema}=mongoose;
const ProductosSchema=new Schema({
    rfid:{type:String, required:true},
    descripcion:{type:String, required: true},
    precio_actual:{type:Number, required:true},
    unidades:{type:Number, required:true},
    oferta:{type:String, required: true},
    descuento:{type:Number, required:true},
    precio_final:{type:Number, required:true}
   })
   module.exports=mongoose.model('Producto',ProductosSchema);