import { Routes } from '@angular/router';
import { activateGuard } from './guards/active.guard';
import { InicioComponent } from './components/inicio/inicio.component';
import { ProductosComponent } from './components/productos/productos.component';
import { AdminOrdenesComponent } from './components/admin-ordenes/admin-ordenes.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { PrivadoComponent } from './components/privado/privado.component';
import { NoEncontradoComponent } from './components/no-encontrado/no-encontrado.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';

export const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent,
    title: 'Inicio',
    canActivate: [activateGuard],
  },
  { path: 'productos', component: ProductosComponent, title: 'Productos' },
  {
    path: 'administradorOrdenes',
    component: AdminOrdenesComponent,
    title: 'Administrador Ordenes',
  },
  { path: 'nosotros', component: NosotrosComponent, title: 'Nosotros' },
  {
    path: 'registrarse',
    component: RegistrarseComponent,
    title: 'Registrarse',
  },
  {
    path: 'iniciar-sesion',
    component: IniciarSesionComponent,
    title: 'Inciar Sesión',
  },
  {
    path: 'administradorUsuario',
    component: AdminUsersComponent,
    title: 'Administrar Usuario',
    canActivate: [activateGuard],
  },
  {
    path: 'privado',
    component: PrivadoComponent,
    title: 'Privado',
    canActivate: [activateGuard],
  },
  {
    path: '',
    redirectTo: 'iniciar-sesion',
    pathMatch: 'full',
    title: 'Inicio',
  },
  { path: '**', component: NoEncontradoComponent, title: '404' },
];
