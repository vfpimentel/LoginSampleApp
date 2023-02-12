import { Usuario } from './../Usuario';
import { Cadastro } from './../Cadastro';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private readonly server = 'http://15.228.238.35';

  private readonly url = `${this.server}:8080`;
  private readonly urlCadastro = `${this.url}/cadastros`;
  private readonly urlAuth = `${this.url}/auth`;

  public usuarioLogado!: Usuario;
  public lista!: Cadastro[];

  constructor(private http: HttpClient) {}

  listar(): Observable<Object> {
    return this.http.get<Object[]>(this.urlCadastro, { headers : {Authorization : `Bearer ${this.usuarioLogado?.token}` }});
  }

  login(): Observable<Object> {
    return this.http.post(this.urlAuth, { login: 'admin', senha: 'teste' });
  }

  logout(): Observable<Object> {
    return this.http.delete(this.urlAuth, {headers : {Authorization : `Bearer ${this.usuarioLogado?.token}`}, responseType: 'text'});
  }
}
