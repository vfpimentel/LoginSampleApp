import { Cadastro } from './../../Cadastro';

import { Router } from '@angular/router';
import { MainService } from './../../servicos/main-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  lista : Cadastro[] = [];

  constructor(
    private service: MainService,
    private router : Router) {}

  ngOnInit(): void {
    if (
      this.service.usuarioLogado == null ||
      this.service.usuarioLogado?.login == null
    )
      this.router.navigate(['/login']);
  }

  listar() {
    this.service.listar().subscribe((data :any) => {
      if (data && data.content && data.content.length) {
        this.lista = data.content;
      }
    }
    ,(err) => {
      this.lista = [];
      alert("Acesso Negado");
      this.service.usuarioLogado = {};
      this.router.navigate(['/login']);
    })
  }

  logout() {
    this.service.logout().subscribe((data : Object) => {
      this.service.usuarioLogado = {};
      this.router.navigate(['/login']);
    })
  }
}
