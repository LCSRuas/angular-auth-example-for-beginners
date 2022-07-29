import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public auth: AuthService) { }

  canActivate(): boolean {
    // 🇧🇷 Verificando se o usuário está autorizado a realizar o login e assim liberar o canActivate
    // 🇺🇸 Checking if the user is authorized to login and thus release canActivate
    if (!this.auth.isAuthenticated()) {
      return false;
    }
    return true;
  }

}
