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

  // ๐ง๐ท Metodo que vai atรฉ o back-end (API) e checa se o usuario estรก autorizado para logar 
  // ๐บ๐ธ Method go to back-end (API) and checks if the user is authorized to login
  authUser(loginData: any) {
    return this.http.post(this.apiUrl + 'user/auth', loginData)
  }

  public isAuthenticated(): boolean {
    // ๐ง๐ท Capturando o JWToken do sessionStorage
    // ๐บ๐ธ Capturing JWToken from sessionStorage
    const token = sessionStorage.getItem('token') || '{}';

    // ๐ง๐ท Checando se o token esta expirado e retornando true ou false
    // ๐บ๐ธ Checking if the token is expired and returning true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
}
