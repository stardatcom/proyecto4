import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  toastrService = inject(ToastrService);

  ngOnInit() {
    const token: any = localStorage.getItem('token');
    /* console.log("Token: ", token); */
    if (token) {
      this.toastrService.success('¡Hola!', '', {
        positionClass: 'toast-bottom-center',
      });
    }
  }
}
