import { Injectable } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Variavel onde vai ser colocada a URL da API
  readonly apiUrl: string;
  readonly requestOptions: any;
  readonly headers_object: any;

  constructor() {
    // ## Capturando a URL da API do environment
    this.apiUrl = environment.apiUrl

    // enviando para o headers_object o valor que sera passado por header nas requicicoes HTTP da API para também checar no back-end se a rota acessada é permitida.
    this.headers_object = new HttpHeaders().set("Authorization", "Bearer " + sessionStorage.getItem('currentToken'));
  }
}
