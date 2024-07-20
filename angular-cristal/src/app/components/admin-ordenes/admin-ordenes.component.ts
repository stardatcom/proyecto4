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

@Component({
  selector: 'app-admin-ordenes',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-ordenes.component.html',
  styleUrl: './admin-ordenes.component.css',
})
export class AdminOrdenesComponent {
  listaOrdenes: OrdenDeTrabajo[] = [];
  formulario: FormGroup = new FormGroup({});
  formularioEnviado: boolean = false;
  nuevaOrden: boolean = true;

  constructor(private ordenesServicio: ListaOrdenesService) {}

  ngOnInit() {
    this.asignarValorFormulario();
    this.obtenerListaOrdenes();
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
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => {
        console.log('error ', error);
      });
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
}
