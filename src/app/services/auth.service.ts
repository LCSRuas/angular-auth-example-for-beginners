import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  constructor(public http: HttpClient,
    public jwtHelper: JwtHelperService) {
    super();
  }

  // 🇧🇷 Metodo que vai até o back-end (API) e checa se o usuario está autorizado para logar 
  // 🇺🇸 Method go to back-end (API) and checks if the user is authorized to login
  authUser(loginData: any) {
    return this.http.post(this.apiUrl + 'user/auth', loginData)
  }

  public isAuthenticated(): boolean {
    // 🇧🇷 Capturando o JWToken do sessionStorage
    // 🇺🇸 Capturing JWToken from sessionStorage
    const token = sessionStorage.getItem('token') || '{}';

    // 🇧🇷 Checando se o token esta expirado e retornando true ou false
    // 🇺🇸 Checking if the token is expired and returning true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
}
