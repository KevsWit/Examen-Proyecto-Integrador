import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, catchError,tap, throwError } from 'rxjs';
import { Usuario } from '../models/usuario';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  Usuarios: Usuario[]=[];
  private URL : string;
  constructor(private http: HttpClient) {
    this.URL = 'http://192.168.100.5:3000/api/registro'
   }

  registro(formValues: {}) :Observable<any>{
    return this.http.post<any>(this.URL, formValues).pipe(
      tap(response => {
          console.log(response)
      })
    )
  }

  getUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.URL).pipe(
      catchError(this.handleError)
    );
  }

  editUsuarios(_id:any, usuario:Usuario): Observable<any>{
    return this.http.put<any>(`${this.URL}/${_id}`,usuario)
  }

  deleteUsuario(_id:any): Observable<any>{
    return this.http.delete<any>(`${this.URL}/${_id}`)
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
