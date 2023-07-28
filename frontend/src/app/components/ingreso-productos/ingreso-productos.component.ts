import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-ingreso-productos',
  templateUrl: './ingreso-productos.component.html',
  styleUrls: ['./ingreso-productos.component.css']
})
export class IngresoProductosComponent implements OnInit {
  respuestaObtenida: string = '';
  nuevoProducto: Producto = new Producto();
  descuentoEditable: boolean = false;
  precioFinalEditable: boolean = true;

  constructor(private productoService: ProductoService) {}

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
      },
      (error: any) => {
        console.error('Error al obtener el último dato:', error);
      }
    );
  }

  guardarProducto() {
    // Verificar si el datohex (rfid) ya existe en la base de datos
    this.productoService.getProductoByRFID(this.nuevoProducto.rfid).subscribe(
      (productos: Producto[]) => {
        if (productos && productos.length > 0) {
          // El datohex (rfid) ya existe, mostrar mensaje de error y no guardar el producto
          console.error('El datohex (rfid) ya existe en la base de datos. No se puede guardar el producto.');
        } else {
          // El datohex (rfid) no existe, guardar el nuevo producto en el servidor
          this.productoService.createProducto(this.nuevoProducto).subscribe(
            (productoGuardado: Producto) => {
              console.log('Producto guardado:', productoGuardado);
              // Realiza alguna acción adicional si lo deseas, como limpiar el formulario o mostrar un mensaje de éxito.
            },
            (error: any) => {
              console.error('Error al guardar el producto:', error);
            }
          );
        }
      },
      (error: any) => {
        console.error('Error al verificar el datohex (rfid) en la base de datos:', error);
      }
    );
  }

  onChangeOferta(): void {
    if (this.nuevoProducto.oferta === 's') {
      // Si la opción es 's', el campo de descuento es editable y el campo de precio_final es no editable
      this.descuentoEditable = true;
      this.precioFinalEditable = false;
      // Calculamos el valor del precio_final en base al precio_actual y descuento
      this.nuevoProducto.precio_final = this.nuevoProducto.precio_actual * ((100-this.nuevoProducto.descuento)/100.0);
    } else if (this.nuevoProducto.oferta === 'n') {
      // Si la opción es 'n', tanto el campo de descuento como el campo de precio_final son no editables y se establecen como cero
      this.descuentoEditable = false;
      this.precioFinalEditable = false;
      this.nuevoProducto.descuento = 0;
      this.nuevoProducto.precio_final = this.nuevoProducto.precio_actual;
    }
  }

  // Función para actualizar el valor de precio_final en tiempo real cuando se ingrese el descuento
  actualizarPrecioFinal(): void {
    if (this.nuevoProducto.descuento !== null && this.nuevoProducto.descuento !== undefined) {
      this.nuevoProducto.precio_final = this.nuevoProducto.precio_actual * ((100-this.nuevoProducto.descuento)/100.0);
    }
  }
}
