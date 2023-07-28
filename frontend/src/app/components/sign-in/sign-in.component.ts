import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SingInComponent implements OnInit {
  users = {
    correo: '',
    psw: ''
  }

  camposLlenos = true;
    constructor(private ServiceAuth:AuthService, private router:Router){

  }
  ngOnInit(): void {
      
  }

  Ingreso() {
    // Verificar si los campos están llenos antes de enviar la solicitud de inicio de sesión
    if (this.users.correo.trim() === '' || this.users.psw.trim() === '') {
      this.camposLlenos = false;
      return; // Detener el envío del formulario si los campos están vacíos
    }

    // Realizar la llamada al servicio de autenticación (AuthService) para enviar las credenciales del usuario.
    this.ServiceAuth.login(this.users).subscribe(
      (res: any) => {
        // El servidor responde con el token de autenticación (res.token).
        // Almacenar el token en el localStorage para mantener la sesión.
        localStorage.setItem('auth_token', res.token);

        // Navegar a la ruta '/admin' después de iniciar sesión correctamente.
        this.router.navigate(['/home']);
      },
      (error: any) => {
        // Manejar cualquier error que ocurra durante el proceso de inicio de sesión.
        console.log('Error al iniciar sesión:', error);
        // Puedes mostrar un mensaje de error al usuario si lo deseas.
      }
    );
  }
}

// Ingreso() {
//   this.ServiceAuth.login(this.users).subscribe(
//     (res: any) => {
//       console.log(res);
//       localStorage.setItem('auth_token', res.token);

//       // Verifica si el usuario es administrador o operador
//       if (res.isAdmin) {
//         this.router.navigate(['/admin']); // Redirige a la página de administrador
//       } else {
//         this.router.navigate(['/operador']); // Redirige a la página de operador
//       }
//     },
//     (error) => {
//       console.error('Error al autenticar:', error);
//       // Manejo de errores si es necesario
//     }
//   );
