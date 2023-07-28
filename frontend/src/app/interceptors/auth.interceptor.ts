import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService : AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let tokenHeader  = request
    tokenHeader = request.clone({
      setHeaders: {
        Authorization: `${this.authService.getloginUser()}`
      }
    })
    return next.handle(tokenHeader);
  }
}
