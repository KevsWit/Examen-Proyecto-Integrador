const Producto=require('../models/productos');
const express=require('express');
const router=express.Router();
const productosController={};

productosController.getProductos= async(req, res)=>
{
  const productos= await Producto.find();
  res.json(productos);
}

productosController.createProductos= async(req,res)=>{
    const producto=new Producto(req.body);
    console.log(producto);
    await producto.save();
    res.json('status: Producto guardado');
   }
   
   productosController.getProducto=async(req,res)=>{
    try {
        const rfid = req.params.rfid;
        const productos = await Producto.find({ rfid: rfid });
        res.json(productos);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
   }
   productosController.editProductoByRFID = async (req, res) => {
    try {
      const rfid = req.params.rfid;
      const updatedData = req.body;
      const producto = await Producto.findOneAndUpdate({ rfid: rfid }, updatedData, { new: true });
  
      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
  
      res.json(producto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  productosController.deleteProductoByRFID = async (req, res) => {
    try {
      const rfid = req.params.rfid;
      const producto = await Producto.findOneAndDelete({ rfid: rfid });
  
      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
  
      res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
productosController.getProductosByOferta = async (req, res) => {
    try {
      const oferta = req.params.oferta;
      const productos = await Producto.find({ oferta: oferta });
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
module.exports=productosController;


