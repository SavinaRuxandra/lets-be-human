import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCharityOrganizationDialogComponent } from './register-charity-organization-dialog.component';

describe('RegisterCharityOrganizationDialogComponent', () => {
  let component: RegisterCharityOrganizationDialogComponent;
  let fixture: ComponentFixture<RegisterCharityOrganizationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCharityOrganizationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCharityOrganizationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
