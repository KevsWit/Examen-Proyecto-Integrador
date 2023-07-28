import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registron',
  templateUrl: './registron.component.html',
  styleUrls: ['./registron.component.css']
})
export class RegistronComponent {
  NewUser = { 
    nombre: '',
    ci: '',
    correo: '',
    usuario: '',
    psw: '',
    role: ''
  }
  mensajeAviso: string = '';
  constructor(private userService:UsersService){}
  RegistrarUsuario() {
    if (this.validatePassword() && this.validateEmail()) {
      this.userService.registro(this.NewUser).subscribe(()=>{
        this.mensajeAviso = 'Registro exitoso'
        this.resetForm();
      },()=>{
        this.mensajeAviso = 'Correo ya en Uso'
      }
        )
    } else {
      alert('Por favor, revisa los campos ingresados.');
    }
  }

  validatePassword(): boolean {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(this.NewUser.psw);
  }

  validateEmail(): boolean {
    const emailRegex = /^[A-Za-z0-9._%+-]+@(ups\.edu\.ec|est\.ups\.edu\.ec)$/;
    return emailRegex.test(this.NewUser.correo);
  }

  resetForm() {
    // Restablece los valores del formulario y el mensaje de aviso
    this.NewUser = {
      nombre: '',
      ci: '',
      correo: '',
      usuario: '',
      role: '',
      psw: ''
    };
    this.mensajeAviso = '';
  }
}
