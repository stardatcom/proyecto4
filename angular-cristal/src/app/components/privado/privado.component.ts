import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service.service';

@Component({
  selector: 'app-privado',
  standalone: true,
  imports: [],
  templateUrl: './privado.component.html',
  styleUrl: './privado.component.css'
})
export class PrivadoComponent {
  loginService = inject(LoginService);

  nombre: string = '';
  ngOnInit() {
    const token: any = localStorage.getItem('token');
    //console.log('token: ', token);
    if (token) {
      this.loginService.validateToken(token).subscribe((res: any) => {
        //console.log('respuesta: ', res);
        if (res.resultado === 'bien') {
          this.nombre = res.datos.nombre;
        } else {
          //console.log('el token no es válido...');
          this.loginService.logout();
        }
      });
    } else {
      this.loginService.logout();
    }
  }
}