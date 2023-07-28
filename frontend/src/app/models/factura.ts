export class Factura {
    constructor(
      public nombre: string = "",
      public correo: string = "",
      public telefono: string = "",
      public dir: string = "",
      public fecha: string = "",
      public cedula: number = 0,
      public productos: ProductoFactura[] = [],
      public valor_total: number = 0
    ) {}
  }
  
  export class ProductoFactura {
    constructor(
      public descripcion: string = "",
      public unidades: number = 0,
      public valor_unitario: number = 0,
      public valor_final: number = 0
    ) {}
  }
  