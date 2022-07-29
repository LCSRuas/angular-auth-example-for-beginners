import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    userLogin: ['', [Validators.required]],
    passwordLogin: ['', [Validators.required]],
  });

  constructor(private authService: AuthService,
    private fb: FormBuilder,
    public router: Router) { }

  ngOnInit(): void {
  }

  login() {
    // 🇧🇷 Realizando a requisição para o serviço de autenticacao
    // 🇺🇸 Making the request to the authentication service
    this.authService.authUser(this.loginForm.value).subscribe((ret: any) => {
      // 🇧🇷 Caso o serviço retorne o valor do JWToken na variavel 'ret', seto ela no sessionStorage
      // 🇺🇸 If the service returns the value of the JWToken in the 'ret' variable, set it to the sessionStorage
      sessionStorage.setItem('token', JSON.stringify(ret));

      // 🇧🇷 Chamo o metodo isAuthenticated no serviço authService para realizar o procedimento do canActivate
      // 🇺🇸 I call the isAuthenticated method on the authService service to perform the canActivate procedure
      this.authService.isAuthenticated();

      // 🇧🇷 Navego até a rota desejada, nesse caso a /home
      // 🇺🇸 Navego até a rota desejada, nesse caso a /home
      this.router.navigate(['/home']);
    }, (error: any) => {
      // 🇧🇷 Caso o authUser retorne um erro (nesse caso o erro HTTP 401) o Observable chama esse trecho e eu alerto o usuário que o usuario ou a senha estão incorretos.
      // 🇺🇸 If the authUser returns an error (in this case the HTTP 401 error) the Observable calls this snippet and I alert the user that the username or password is incorrect.
      alert('Incorrect username or password');

      // 🇧🇷 Se você quiser ver exatamente o erro retornado do observable utilize esse console.error()
      // 🇺🇸 If you want to see exactly the error returned from the observable use this console.error()
      // console.error(error);

      // 🇧🇷 Caso você queira, você pode tratar esses erros conforme o codigo HTTP deles. por exemplo: codigo 401 - Mensagem de erro de authenticacao, codigo 500 - Mensagem de erro interno na API, etc.
      // 🇺🇸 If you want, you can handle these errors according to their HTTP code.for example: code 401 - Authentication error message, code 500 - Internal API error message, etc.
    })

  }

}
