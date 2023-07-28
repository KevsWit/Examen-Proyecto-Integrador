import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProductosComponent } from './ver-productos.component';

describe('VerProductosComponent', () => {
  let component: VerProductosComponent;
  let fixture: ComponentFixture<VerProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerProductosComponent]
    });
    fixture = TestBed.createComponent(VerProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
