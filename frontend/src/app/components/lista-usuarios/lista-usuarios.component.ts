import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { Usuario } from 'src/app/models/usuario';
import { UsersService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit{
  
  usuarios: Usuario[] = [];
  edicionHabilitada = false;
  constructor(private usuariosService: UsersService) {}
  ngOnInit(): void {   
    this.obtenerUsuarios()
  }

  obtenerUsuarios(){
    this.usuariosService.getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios
      )
  }
  habilitarEdicion() {
    this.edicionHabilitada = true;
  }

  guardarEdicion(usuario: Usuario) {
    const id = usuario._id
    this.usuariosService.editUsuarios(id,usuario).subscribe(
    )
    this.edicionHabilitada = false;
    
  }

  EliminarUsuario(usuario: Usuario){
    const id = usuario._id
    this.usuariosService.deleteUsuario(id).subscribe()
    this.edicionHabilitada = false;

  }

  cancelarEdicion() {
    // Aquí puedes implementar la lógica para cancelar la edición
    this.edicionHabilitada = false;
  }

}
