import { of } from "rxjs";

export class Producto {
    constructor(rfid="",descripcion="",precio_actual=0,unidades=0,oferta="",descuento=0,precio_final=0){
        this.rfid=rfid;
        this.descripcion=descripcion;
        this.precio_actual=precio_actual;
        this.unidades=unidades;
        this.oferta=oferta;
        this.descuento=descuento;
        this.precio_final=precio_final;
    }
    rfid: string;
    descripcion: string;
    precio_actual: number;
    unidades: number;
    oferta: string;
    descuento: number;
    precio_final: number;
}
