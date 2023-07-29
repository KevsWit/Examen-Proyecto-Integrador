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
        // Verificar si el datohex (rfid) ya existe en la base de datos
    this.productoService.getProductoByRFID(this.respuestaObtenida).subscribe(
      (productos: Producto[]) => {
        if (productos && productos.length > 0) {
          // El datohex (rfid) ya existe, mostrar mensaje de error y no guardar el producto
          alert('El datohex (rfid) ya existe en la base de datos. No se puede guardar el producto.');
          window.location.reload();
        } else {
          // Asignar la respuestaObtenida como dato rfid del nuevoProducto
        this.nuevoProducto.rfid = this.respuestaObtenida;
        }
      },
      (error: any) => {
        alert('Error al verificar el datohex (rfid) en la base de datos: ' + JSON.stringify(error));
      }
    );
        
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
          alert('El datohex (rfid) ya existe en la base de datos. No se puede guardar el producto.');
        } else {
          // Validar campos antes de guardar el nuevo producto
          if (this.validateFields()) {
            // El datohex (rfid) no existe, guardar el nuevo producto en el servidor
            this.productoService.createProducto(this.nuevoProducto).subscribe(
              (productoGuardado: Producto) => {
                alert('Producto guardado: ' + JSON.stringify(productoGuardado));
              },
              (error: any) => {
                alert('Error al guardar el producto: ' + JSON.stringify(error));
              }
            );
          } else {
            // Mostrar mensaje de error si algún campo no cumple con las validaciones
            alert('Por favor, revisa los campos ingresados.');
          }
        }
      },
      (error: any) => {
        alert('Error al verificar el datohex (rfid) en la base de datos: ' + JSON.stringify(error));
      }
    );
  }
  
  validateFields(): boolean {
    // Validar que precio_actual sea mayor o igual a cero
    if (this.nuevoProducto.precio_actual < 0) {
      return false;
    }
  
    // Validar que unidades sea mayor o igual a uno y no sea un valor decimal
    if (!Number.isInteger(this.nuevoProducto.unidades) || this.nuevoProducto.unidades < 1) {
      return false;
    }
  
    // Validar que descuento sea mayor o igual a cero
    if (this.nuevoProducto.descuento < 0) {
      return false;
    }
  
    // Todas las validaciones pasaron, devolver true
    return true;
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
