import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Factura, ProductoFactura } from '../models/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  selectedFactura: Factura;
  facturas: Factura[] = [];
  private serverUrl = 'http://192.168.100.5:3000'; // Reemplaza con la URL de tu servidor Node.js
  
  constructor(private http: HttpClient) {
    this.selectedFactura = new Factura();
  }

  // Método para crear una factura en el servidor Node.js
  createFactura(factura: Factura): Observable<any> {
    return this.http.post(`${this.serverUrl}/api/facturas`, factura)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error de cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
