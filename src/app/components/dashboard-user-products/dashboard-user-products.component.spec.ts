import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUserProductsComponent } from './dashboard-user-products.component';

describe('DashboardUserProductsComponent', () => {
  let component: DashboardUserProductsComponent;
  let fixture: ComponentFixture<DashboardUserProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardUserProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardUserProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
