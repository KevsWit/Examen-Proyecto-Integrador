import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturarComponent } from './facturar.component';

describe('FacturarComponent', () => {
  let component: FacturarComponent;
  let fixture: ComponentFixture<FacturarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacturarComponent]
    });
    fixture = TestBed.createComponent(FacturarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
