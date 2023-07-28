import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-ver-productos',
  templateUrl: './ver-productos.component.html',
  styleUrls: ['./ver-productos.component.css']
})
export class VerProductosComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.getProductos().subscribe(
      productos => this.productos = productos,
      error => console.error(error)
    );
  }

  editarProducto(producto: Producto): void {
    // Verificar que la parte de oferta sea 's' o 'n'
    if (producto.oferta !== 's' && producto.oferta !== 'n') {
      console.error('Oferta debe ser "s" o "n".');
      return;
    }

    // Si la opción es 's', recalcular el precio final
    if (producto.oferta === 's') {
      producto.precio_final = producto.precio_actual * ((100 - producto.descuento) / 100.0);
    }
    if (producto.oferta === 'n') {
      producto.descuento = 0;
      producto.precio_final = producto.precio_actual;
    }

    this.productoService.editProductoByRFID(producto.rfid, producto).subscribe(
      productoEditado => {
        console.log('Producto editado:', productoEditado);
        // Aquí puedes realizar alguna acción adicional si lo deseas
      },
      error => console.error(error)
    );
  }

  eliminarProducto(rfid: string): void {
    this.productoService.deleteProductoByRFID(rfid).subscribe(
      response => {
        console.log(response.message);
        // Aquí puedes realizar alguna acción adicional si lo deseas
      },
      error => console.error(error)
    );
  }
}
