import { Component } from '@angular/core';
import { OrdenDeTrabajo } from '../../modelos/ordenDeTrabajo';
import { ListaOrdenesService } from '../../services/lista-ordenes.service';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
  FormControlName,
  AbstractControl,
} from '@angular/forms';
import { LoginService } from '../../services/login.service.service';
import { ListaUsuarioService } from '../../services/lista-usuario.service';
import { Usuario } from '../../modelos/usuario';

@Component({
  selector: 'app-admin-ordenes',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-ordenes.component.html',
  styleUrl: './admin-ordenes.component.css',
  providers: [LoginService],
})
export class AdminOrdenesComponent {
  listaOrdenes: OrdenDeTrabajo[] = [];
  formulario: FormGroup = new FormGroup({});
  formularioEnviado: boolean = false;
  nuevaOrden: boolean = true;
  rol: boolean = false;
  listaUsuario: Usuario[] = [];

  constructor(
    private ordenesServicio: ListaOrdenesService,
    private loginService: LoginService,
    private usuarioServicio: ListaUsuarioService
  ) {}

  ngOnInit() {
    this.asignarValorFormulario();
    this.obtenerListaOrdenes();
    let rol = this.loginService.getRol();
    this.rol =
      rol.toLowerCase() == 'admin' || rol.toLowerCase() == 'administrador';
  }

  obtenerListaOrdenes() {
    this.ordenesServicio.leerListaOrdenes().subscribe((respuesta: any) => {
      console.log(respuesta);
      this.listaOrdenes = respuesta.datos as OrdenDeTrabajo[];
    });
  }

  private asignarValorFormulario(
    ordenes: OrdenDeTrabajo = new OrdenDeTrabajo()
  ) {
    this.formulario = new FormGroup({
      ID: new FormControl(ordenes.ID, [Validators.required]),
      descripcion: new FormControl(ordenes.descripcion, [Validators.required]),
      lHerramienta: new FormControl(ordenes.listaHerramienta, [
        Validators.required,
      ]),
      lBodega: new FormControl(ordenes.listaBodega, [Validators.required]),
      fecha: new FormControl(ordenes.fecha, [Validators.required]),
      usuario: new FormControl(ordenes.IDusuario, [Validators.required]),
    });
  }

  async obtenerFormulario() {
    await this.crearOrden();
  }

  async crearOrden() {
    this.formularioEnviado = true;
    if (this.formulario.invalid) {
      return;
    }
    let ordenes: OrdenDeTrabajo = new OrdenDeTrabajo();
    ordenes.ID = this.formulario.get('ID')?.value;
    ordenes.descripcion = this.formulario.get('descripcion')?.value;
    ordenes.listaHerramienta = this.formulario.get('lHerramienta')?.value;
    ordenes.listaHerramienta = this.formulario.get('lBodega')?.value;
    ordenes.fecha = this.formulario.get('fecha')?.value;
    ordenes.IDusuario = this.formulario.get('usuario')?.value;
    await this.ordenesServicio
      .crearOrden(ordenes)
      .then((resp: any) => {
        console.log(resp);
        if (resp) {
          if (resp.resultado == 'mal') {
            return;
          }
          this.obtenerListaOrdenes();
          this.cerrarModal();
        }
      })
      .catch((error) => {
        console.log('error ', error);
      });
  }

  cerrarModal() {
    document.getElementById('cerrarModal')?.click();
    this.formularioEnviado = false;
  }

  get validacionFormulario(): { [key: string]: AbstractControl } {
    return this.formulario.controls;
  }

  async eliminarOrden(ordenID: string) {
    await this.ordenesServicio.deleteOrden(ordenID).then((resp) => {
      console.log(resp);
    });
    this.obtenerListaOrdenes();
  }

  obtenerListas() {
    this.obtenerListaUsuario();
  }

  obtenerListaUsuario() {
    this.usuarioServicio.leerListaUsuario().subscribe((respuesta: any) => {
      console.log(respuesta);
      this.listaUsuario = respuesta.datos as Usuario[];
      this.listaUsuario = this.listaUsuario.filter((item) => item.estado);
    });
  }
}
