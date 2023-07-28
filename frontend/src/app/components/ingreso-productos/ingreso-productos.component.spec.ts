import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoProductosComponent } from './ingreso-productos.component';

describe('IngresoProductosComponent', () => {
  let component: IngresoProductosComponent;
  let fixture: ComponentFixture<IngresoProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngresoProductosComponent]
    });
    fixture = TestBed.createComponent(IngresoProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
