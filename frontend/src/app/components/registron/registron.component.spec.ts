import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistronComponent } from './registron.component';

describe('RegistronComponent', () => {
  let component: RegistronComponent;
  let fixture: ComponentFixture<RegistronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistronComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
