import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service.service';

export const activateGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loginService = inject(LoginService);

  const listaAdmin = ['inicio', 'administradorOrdenes', 'administradorUsuario'];
  const pathAdminDefault = '/inicio';
  const listaNoAdmin = ['administradorOrdenes'];
  const pathNoAdminDefault = '/administradorOrdenes';

  let isAdmin =
    loginService.getRol().toLowerCase() == 'admin' ||
    loginService.getRol().toLowerCase() == 'administrador';
  const path: string = state.url.replace('/', '');
  //console.log('path guard', path);

  let pathValid: boolean = false;

  if (loginService.isLogin()) {
    if (isAdmin) {
      pathValid = listaAdmin.includes(path);
    } else {
      pathValid = listaNoAdmin.includes(path);
    }
  }

  if (!loginService.isLogin()) {
    router.navigateByUrl('/iniciar-sesion');
  }
  if (!pathValid) {
    if (isAdmin) {
      router.navigateByUrl(pathAdminDefault);
    } else {
      router.navigateByUrl(pathNoAdminDefault);
    }
  }
  return pathValid;
};
