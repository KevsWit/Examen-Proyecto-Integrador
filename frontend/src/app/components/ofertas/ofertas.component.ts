import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {
  productosOfertas: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.obtenerProductosOfertas();
  }

  obtenerProductosOfertas(): void {
    this.productoService.getProductosByOferta('s').subscribe(
      productos => {
        this.productosOfertas = productos;
      },
      error => console.error(error)
    );
  }
}
