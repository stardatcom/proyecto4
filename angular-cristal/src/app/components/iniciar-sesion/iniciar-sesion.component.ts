import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators,} from "@angular/forms";
import { Router } from '@angular/router';
//import { JwtHelperService } from '@auth0/angular-jwt';
import { Credential } from '../../interfaces/credential.js';
import { LoginService } from '../../services/login.service.service.js';

//const jwtHelperService = new JwtHelperService();

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {
  router = inject(Router);
  loginService: LoginService = inject(LoginService);

  formularioCredenciales = new FormGroup({
    usuario: new FormControl('', Validators.required),
    contrasenia: new FormControl('', Validators.required),
  });
  manejarEnvio(){
    if (this.formularioCredenciales.valid) {
      const usuario = this.formularioCredenciales.value.usuario;
      const password = this.formularioCredenciales.value.contrasenia;
      if (typeof usuario === 'string' && typeof password === 'string') {
        const credential: Credential = {
          usuario,
          password,
        };

        this.loginService.login(credential).subscribe((res: any) => {
          console.log('response: ', res);
          //const decoded = jwtHelperService.decodeToken(res.datos.token);
          //console.log('decoded: ', decoded);
          localStorage.setItem('token', res.datos.token);
          this.router.navigateByUrl('/privado');
        });
      }
    } else {
      console.log('Error: invalid form');
    }
  }
}
