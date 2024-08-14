import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credential } from '../../interfaces/credential.js';
import { LoginService } from '../../services/login.service.service.js';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css',
})
export class IniciarSesionComponent {
  router = inject(Router);
  toastrService = inject(ToastrService);
  loginService: LoginService = inject(LoginService);

  formularioCredenciales = new FormGroup({
    usuario: new FormControl('', Validators.required),
    contrasenia: new FormControl('', Validators.required),
  });
  manejarEnvio() {
    if (this.formularioCredenciales.valid) {
      const usuario = this.formularioCredenciales.value.usuario;
      const password = this.formularioCredenciales.value.contrasenia;
      if (typeof usuario === 'string' && typeof password === 'string') {
        const credential: Credential = {
          usuario,
          password,
        };

        this.loginService.login(credential).subscribe((res: any) => {
          /* console.log('response: ', res); */
          if (res.resultado === 'bien') {
            localStorage.setItem('token', res.datos.token.token);
            localStorage.setItem('rol', res.datos.rolID);
            this.cerrarModal();
            this.router.navigateByUrl('/inicio');
          } else {
            this.toastrService.error('Credenciales invalidas.', '', {
              positionClass: 'toast-bottom-center',
            });
          }
        });
      }
    } else {
      this.toastrService.warning('Campos vacios, por favor llenar.', '', {
        positionClass: 'toast-bottom-center',
      });
    }
  }

  cerrarModal() {
    document.getElementById('cerrarModal')?.click();
  }
}
