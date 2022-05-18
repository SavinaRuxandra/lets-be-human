import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDonorDialogComponent } from './register-donor-dialog.component';

describe('RegisterDonorDialogComponent', () => {
  let component: RegisterDonorDialogComponent;
  let fixture: ComponentFixture<RegisterDonorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterDonorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDonorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
