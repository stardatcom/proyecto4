import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './navegacion.component.html',
  styleUrl: './navegacion.component.css',
})
export class NavegacionComponent {
  loginService = inject(LoginService);
} 
