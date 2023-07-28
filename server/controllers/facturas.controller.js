const Factura=require('../models/facturas');
const express=require('express');
const router=express.Router();
const facturasController={};

facturasController.createFacturas= async(req,res)=>{
    const factura=new Factura(req.body);
    console.log(factura);
    await factura.save();
    res.json('status: Factura guardada');
   }

module.exports=facturasController;


