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
  constructor(private userService:UsersService){}
  RegistrarUsuario(){
      this.userService.registro(this.NewUser).subscribe()
  }
}
