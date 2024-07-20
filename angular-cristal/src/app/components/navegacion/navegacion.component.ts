import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navegacion.component.html',
  styleUrl: './navegacion.component.css',
})
export class NavegacionComponent {
  loginService = inject(LoginService);
}
