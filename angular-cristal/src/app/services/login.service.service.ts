import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credential } from '../interfaces/credential.js';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  httpClient = inject(HttpClient);
  // toastrService = inject(ToastrService);
  router = inject(Router);

  constructor(private toastrService: ToastrService) {}

  API_URL = 'http://3.141.18.123:2000/iniciar-sesion';

  login(credential: Credential) {
    return this.httpClient.post(this.API_URL, credential);
  }

  validateToken(token: string) {
    return this.httpClient.get(`${this.API_URL}/${token}`);
  }

  isLogin() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    let confirmation = confirm('¿Desea cerrar sesión?');
    if (confirmation) {
      localStorage.removeItem('token');
      this.router.navigate(['/iniciar-sesion']);
      this.toastrService.success('¡Hasta luego!', '', {
        positionClass: 'toast-bottom-center',
      });
    } else {
      this.toastrService.info('NO ha CERRADO sesión.', '', {
        positionClass: 'toast-bottom-center',
      });
    }
  }

  getRol(): string {
    return localStorage.getItem('rol') ?? '';
  }
}
