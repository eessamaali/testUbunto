import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentCalculatorComponent } from './installment-calculator.component';

describe('InstallmentCalculatorComponent', () => {
  let component: InstallmentCalculatorComponent;
  let fixture: ComponentFixture<InstallmentCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallmentCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallmentCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
