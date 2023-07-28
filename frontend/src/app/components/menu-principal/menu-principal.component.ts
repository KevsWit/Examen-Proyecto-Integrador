import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent {
  constructor(private serviceAuth:AuthService, private router: Router){}
  islogin(): boolean {
    return this.serviceAuth.islogin();
  }
  logout(){
    this.serviceAuth.logout()
    this.router.navigate(['/signIn']);
  }

  isOperator(){
    const role = this.serviceAuth.getUserRole()
    if (role === 'operador'){
      return role
    }
    return null
  }

  isAdmin(){
    const role = this.serviceAuth.getUserRole()
    if (role === 'admin'){
      return role
    }
    return null
  }
}
