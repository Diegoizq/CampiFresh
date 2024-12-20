import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCarritoComponent } from './button-carrito.component';

describe('ButtonCarritoComponent', () => {
  let component: ButtonCarritoComponent;
  let fixture: ComponentFixture<ButtonCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonCarritoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
