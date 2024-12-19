import { TestBed } from '@angular/core/testing';

import { ButtonCarritoService } from './button-carrito.service';

describe('ButtonCarritoService', () => {
  let service: ButtonCarritoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ButtonCarritoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
