import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
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