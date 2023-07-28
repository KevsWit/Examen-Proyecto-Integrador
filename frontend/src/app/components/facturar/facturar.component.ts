import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from '../../models/producto';
import { Factura, ProductoFactura } from 'src/app/models/factura';
import { FacturaService } from 'src/app/services/factura.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; 
@Component({
  selector: 'app-facturar',
  templateUrl: './facturar.component.html',
  styleUrls: ['./facturar.component.css']
})
export class FacturarComponent implements OnInit {
  respuestaObtenida: string = '';
  nuevoProducto: Producto = new Producto();
  errorProductoNoEncontrado: boolean = false;
  datosFacturaListos: boolean = false;
  factura: Factura = new Factura();
  totalValorFinal: number = 0;

  constructor(private productoService: ProductoService, private facturaService: FacturaService) { }

  ngOnInit() {
    // Suscribirse al observable para obtener el último dato recibido
    this.productoService.ultimoDatoHex$.subscribe((datoRecibido: string) => {
      this.respuestaObtenida = datoRecibido;
    });
  }

  onSubmit() {
    // Llama al servicio para obtener el último dato almacenado en el servidor
    this.productoService.obtenerUltimoDatoHex().subscribe(
      (datoRecibido: string) => {
        this.respuestaObtenida = datoRecibido;
        // Asignar la respuestaObtenida como dato rfid del nuevoProducto
        this.nuevoProducto.rfid = this.respuestaObtenida;

        // Verificar si existe el producto con el rfid obtenido
        this.productoService.getProductoByRFID(this.respuestaObtenida).subscribe(
          (productos: Producto[]) => {
            if (productos && productos.length > 0) {
              // Si se encontró el producto, mostrar los detalles en el formulario
              this.nuevoProducto = productos[0]; // Suponemos que solo hay un producto con el mismo rfid
              this.errorProductoNoEncontrado = false;
            } else {
              // Si no se encontró el producto, mostrar mensaje de error
              this.errorProductoNoEncontrado = true;
            }
          },
          (error: any) => {
            console.error('Error al obtener el producto:', error);
          }
        );
      },
      (error: any) => {
        console.error('Error al obtener el último dato:', error);
      }
    );
  }

  agregarProducto() {
    // Calcular el precio final y agregar el producto al array de productos de la factura
    const precio_final = this.nuevoProducto.precio_actual * this.nuevoProducto.unidades;
    const productoFactura: ProductoFactura = {
      descripcion: this.nuevoProducto.descripcion,
      unidades: this.nuevoProducto.unidades,
      valor_unitario: this.nuevoProducto.precio_actual,
      valor_final: precio_final // Usamos el precio_final calculado
    };
    this.factura.productos.push(productoFactura);

    // Calcular el totalValorFinal de la factura
    this.totalValorFinal = this.factura.productos.reduce((total, producto) => total + producto.valor_final, 0);

    // Limpiar los campos para agregar otro producto
    this.nuevoProducto = new Producto();
  }

  
  generarPDF() {
    const doc = new jsPDF();
    
    // Encabezado del PDF
    doc.setFontSize(18);
    doc.text('Factura', 10, 20);

    // Información de la factura
    doc.setFontSize(12);
    doc.text(`Nombre: ${this.factura.nombre}`, 10, 30);
    doc.text(`Correo: ${this.factura.correo}`, 10, 40);
    doc.text(`Teléfono: ${this.factura.telefono}`, 10, 50);
    // Agregar más información relevante de la factura aquí
    // ...

    // Tabla con los productos agregados
    const data = this.factura.productos.map(producto => [producto.descripcion, producto.unidades, producto.valor_unitario, producto.valor_final]);
    (doc as any).autoTable({
      head: [['Descripción', 'Unidades', 'Valor Unitario', 'Valor Final']],
      body: data,
      startY: 60
    });

    // Total Valor Final
    doc.text(`Total Valor Final: ${this.totalValorFinal}`, 10, (doc as any).previousAutoTable.finalY + 10);

    // Guardar el PDF
    doc.save('factura.pdf');
  }
  guardarFactura() {
    // Asignar el valor total al campo 'valor_total' de la factura
    this.factura.valor_total = this.totalValorFinal;
  
    // Agregar aquí la lógica para guardar la factura en el servidor
    this.facturaService.createFactura(this.factura).subscribe(
      (response) => {
        console.log('Factura guardada:', response);
        this.generarPDF();
        // Reseteamos los campos
        this.factura = new Factura();
        this.totalValorFinal = 0;
      },
      (error) => {
        console.error('Error al guardar la factura:', error);
      }
    );
  }
  
}
