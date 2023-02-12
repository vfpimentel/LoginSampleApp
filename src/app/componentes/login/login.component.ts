import { Router } from '@angular/router';
import { MainService } from './../../servicos/main-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private service: MainService, private router: Router) {}

  ngOnInit(): void {
    console.log('LoginComponente - OnInit()', this.service.usuarioLogado);
    if (this.service.usuarioLogado && this.service.usuarioLogado.login) {
      this.router.navigate(['/home']);
    }
  }

  logar(): void {
    this.service.login().subscribe((data: any) => {
      if (data && data.login && data.token) {
        console.log("login()",data);
        this.service.usuarioLogado = {
          login: data.login,
          token: data.token
        };
        this.router.navigate(['/home']);
      }
    });
  }
}
