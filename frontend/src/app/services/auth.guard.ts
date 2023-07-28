import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRole = route.data['requiredRole'];

    if (this.authService.islogin()) {
      const userRole = this.authService.getUserRole();
      if (userRole === requiredRole) {
        return true;
      }else {
        this.router.navigate(['/SingIn']); // Redirigir a una página de acceso denegado si el usuario no tiene el rol adecuado
        return false;
      }
    }

    this.router.navigate(['/SingIn']); // Redirigir a la página de inicio de sesión si el usuario no está autenticado
    return false;
  }
}
