import { Component, inject } from '@angular/core';
import { Usuario } from '../../modelos/usuario';
import { ListaUsuarioService } from '../../services/lista-usuario.service';
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
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css',
})
export class AdminUsersComponent {
  listaUsuario: Usuario[] = [];
  formulario: FormGroup = new FormGroup({});
  formularioEnviado: boolean = false;
  nuevoUsuario: boolean = true;
  tiposRol:string[]=["Admin","Colaborador"]
  
  toastrService = inject(ToastrService);

  constructor(private usuarioServicio: ListaUsuarioService) {}

  ngOnInit() {
    this.asignarValorFormulario();
    this.obtenerListaUsuario();
  }

  obtenerListaUsuario() {
    this.usuarioServicio.leerListaUsuario().subscribe((respuesta: any) => {
      console.log(respuesta);
      this.listaUsuario = respuesta.datos as Usuario[];
    });
  }

  private asignarValorFormulario(usuario: Usuario = new Usuario()) {
    this.formulario = new FormGroup({
      nombre: new FormControl(usuario.nombre, [Validators.required]),
      email: new FormControl(usuario.email, [
        Validators.required,
        Validators.email,
      ]),
      contrasenia: new FormControl(usuario.contrasenia, [
        Validators.required,
        Validators.minLength(8),
      ]),
      rol: new FormControl(usuario.rolID, [Validators.required]),
      estado: new FormControl(usuario.estado, [Validators.required]),
      id: new FormControl(usuario._id),
    });
  }

  async obtenerFormulario() {
    if (this.nuevoUsuario) {
      await this.crearUsuario();
      return;
    }
    await this.actualizarUsuario();
  }

  async crearUsuario() {
    this.formularioEnviado = true;
    if (this.formulario.invalid) {
      return;
    }
    let usuario: Usuario = new Usuario();
    usuario.nombre = this.formulario.get('nombre')?.value;
    usuario.email = this.formulario.get('email')?.value;
    usuario.contrasenia = this.formulario.get('contrasenia')?.value;
    usuario.rolID = this.formulario.get('rol')?.value;
    usuario.estado = this.formulario.get('estado')?.value;
    usuario.ID = usuario.nombre + ' ' + usuario.email;
    debugger;
    await this.usuarioServicio
      .crearUsuario(usuario)
      .then((resp: any) => {
        console.log(resp);
        if (resp) {
          if (resp.resultado == 'mal') {
            return;
          }
          this.obtenerListaUsuario();
          this.cerrarModal();
          this.toastrService.success('Usuario creado.', '', {
            positionClass: 'toast-bottom-center',
          });
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

  async actualizarUsuario() {
    this.formularioEnviado = true;
    if (this.formulario.invalid) {
      return;
    }
    let usuario: Usuario = new Usuario();
    usuario.nombre = this.formulario.get('nombre')?.value;
    usuario.email = this.formulario.get('email')?.value;
    usuario.contrasenia = this.formulario.get('contrasenia')?.value;
    usuario.rolID = this.formulario.get('rol')?.value;
    usuario.estado = this.formulario.get('estado')?.value;
    usuario._id = this.formulario.get('id')?.value;
    console.log(usuario);
    await this.usuarioServicio
      .actualizarUsuario(usuario)
      .then((resp: any) => {
        console.log(resp);
        if (resp) {
          if (resp.resultado == 'mal') {
            return;
          }
          this.cerrarModal();
          this.toastrService.success('Usuario actualizado.', '', {
            positionClass: 'toast-bottom-center',
          });
        }
      })
      .catch((error) => {
        console.log('error ', error);
      });
  }

  get validacionFormulario(): { [key: string]: AbstractControl } {
    return this.formulario.controls;
  }

  setValoresModal(nuevoUsuario: boolean, usuario: Usuario = new Usuario()) {
    this.nuevoUsuario = nuevoUsuario;
    this.asignarValorFormulario(usuario);
  }
}
