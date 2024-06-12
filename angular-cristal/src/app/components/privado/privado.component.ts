import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelperService = new JwtHelperService();

@Component({
  selector: 'app-privado',
  standalone: true,
  imports: [],
  templateUrl: './privado.component.html',
  styleUrl: './privado.component.css'
})
export class PrivadoComponent {
  nombre: string = '';
  ngOnInit() {
    const token: any = localStorage.getItem('token');
    console.log('token: ', token);
    const decoded = jwtHelperService.decodeToken(token);
    console.log('decoded: ', decoded);
    this.nombre = decoded.nombre;
  }
}
