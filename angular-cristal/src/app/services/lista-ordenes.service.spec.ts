import { TestBed } from '@angular/core/testing';

import { ListaOrdenesService } from './lista-ordenes.service';

describe('ListaOrdenesService', () => {
  let service: ListaOrdenesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaOrdenesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
