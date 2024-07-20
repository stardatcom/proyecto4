import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ProductosComponent } from './components/productos/productos.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { PrivadoComponent } from './components/privado/privado.component';
import { NoEncontradoComponent } from "./components/no-encontrado/no-encontrado.component";
import { AdminOrdenesComponent } from './components/admin-ordenes/admin-ordenes.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavegacionComponent, InicioComponent, ProductosComponent, AdminUsersComponent, AdminOrdenesComponent, NosotrosComponent, RegistrarseComponent, IniciarSesionComponent, PrivadoComponent, HeaderComponent, FooterComponent, NoEncontradoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Cristal';
}
