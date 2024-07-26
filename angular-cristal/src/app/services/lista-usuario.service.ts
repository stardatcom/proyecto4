import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../modelos/usuario';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListaUsuarioService {
  constructor(private httpcliente: HttpClient) {}
  API_URL = 'http://3.128.184.112:2000/';

  leerListaUsuario() {
    return this.httpcliente.get(`${this.API_URL}usuarios`);
  }

  async crearUsuario(usuario: Usuario) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return await firstValueFrom(
      this.httpcliente.post(`${this.API_URL}usuarios`, usuario, {
        headers,
      })
    );
  }

  async actualizarUsuario(usuario: Usuario) {
    return await firstValueFrom(
      this.httpcliente.put(`${this.API_URL}usuarios/${usuario._id}`, usuario)
    );
  }
}
