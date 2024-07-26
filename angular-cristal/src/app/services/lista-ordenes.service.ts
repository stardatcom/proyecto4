import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrdenDeTrabajo } from '../modelos/ordenDeTrabajo';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListaOrdenesService {
  constructor(private httpcliente: HttpClient) {}
  API_URL = 'http://3.128.184.112:2000/';

  leerListaOrdenes() {
    return this.httpcliente.get(`${this.API_URL}orden-de-trabajo`);
  }

  async crearOrden(orden: OrdenDeTrabajo) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return await firstValueFrom(
      this.httpcliente.post(`${this.API_URL}orden-de-trabajo`, orden, {
        headers,
      })
    );
  }

  async deleteOrden(ordenID: string) {
    return await firstValueFrom(
      this.httpcliente.delete(`${this.API_URL}orden-de-trabajo/${ordenID}`)
    );
  }
}
