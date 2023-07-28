import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Producto } from '../models/producto';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  selectedProducto: Producto;
  productos: Producto[]=[];
  private serverUrl = 'http://192.168.100.5:3000'; // Reemplaza con la URL de tu servidor Node.js

  private ultimoDatoHexSubject = new BehaviorSubject<string>('');
  ultimoDatoHex$ = this.ultimoDatoHexSubject.asObservable();

  constructor(private http: HttpClient) {
    this.selectedProducto = new Producto();
  }

  obtenerDatoHex(datoHex: string) {
    // Define los parámetros para la solicitud HTTP GET
    const params = new HttpParams().set('datoHex', datoHex);

    // Realiza la solicitud HTTP GET al servidor
    return this.http.get<string>(`${this.serverUrl}/datohex`, { params }).pipe(
      tap((datoRecibido: string) => {
        this.ultimoDatoHexSubject.next(datoRecibido);
      })
    );
  }

  obtenerUltimoDatoHex() {
    // Realiza la solicitud HTTP GET al servidor para obtener el último valor almacenado
    return this.http.get(`${this.serverUrl}/ultimoDatoHex`, { responseType: 'text' });
  }
  // Función para obtener todos los productos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.serverUrl}/api/productos`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Función para crear un nuevo producto
  createProducto(producto: Producto): Observable<any> {
    return this.http.post(`${this.serverUrl}/api/productos`, producto)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Función para obtener un producto por su RFID
  getProductoByRFID(rfid: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.serverUrl}/api/productos/${rfid}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Función para editar un producto por su RFID
  editProductoByRFID(rfid: string, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.serverUrl}/api/productos/${rfid}`, producto)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Función para eliminar un producto por su RFID
  deleteProductoByRFID(rfid: string): Observable<any> {
    return this.http.delete(`${this.serverUrl}/api/productos/${rfid}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  // Función para obtener productos por su oferta
getProductosByOferta(oferta: string): Observable<Producto[]> {
  return this.http.get<Producto[]>(`${this.serverUrl}/api/productos/oferta/${oferta}`)
    .pipe(
      catchError(this.handleError)
    );
}

  // Función para manejar errores HTTP
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






