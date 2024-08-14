import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IniciarSesionComponent } from './iniciar-sesion.component';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service.service.js';
import { ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';

fdescribe('IniciarSesionComponent', () => {
  let component: IniciarSesionComponent;
  let fixture: ComponentFixture<IniciarSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IniciarSesionComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [Router, LoginService, ToastrService],
    }).compileComponents();

    fixture = TestBed.createComponent(IniciarSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
