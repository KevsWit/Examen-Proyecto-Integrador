import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-gestion-producto',
  templateUrl: './gestion-producto.component.html',
  styleUrls: ['./gestion-producto.component.css']
})
export class GestionProductoComponent {
  constructor(private router: Router) {}
}
