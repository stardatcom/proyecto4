import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credential } from '../interfaces/credential.js';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}
  httpClient = inject(HttpClient);

  login(credential: Credential) {
    return this.httpClient.post(
      'http://localhost:2000/iniciar-sesion',
      credential
    );
  }
}