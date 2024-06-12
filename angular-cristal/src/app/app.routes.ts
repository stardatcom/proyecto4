import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { PrivadoComponent } from './components/privado/privado.component';
import { NoEncontradoComponent } from "./components/no-encontrado/no-encontrado.component";

export const routes: Routes = [
    {path: "inicio", component: InicioComponent , title: "Inicio"},
    {path: "productos", component: ProductosComponent , title: "Productos"},
    {path: "servicios", component: ServiciosComponent , title: "Servicios"},
    {path: "nosotros", component: NosotrosComponent , title: "Nosotros"},
    {path: "contacto", component: ContactoComponent , title: "Contacto"},
    {path: "registrarse", component: RegistrarseComponent , title: "Registrarse"},
    {path: "iniciar-sesion", component: IniciarSesionComponent , title: "Inciar Sesión"},
    {path: "privado", component: PrivadoComponent , title: "Privado"},
    {path: "", redirectTo: "inicio", pathMatch: "full" , title: "Inicio"},
    {path: "**", component: NoEncontradoComponent, title: "404"}
];
