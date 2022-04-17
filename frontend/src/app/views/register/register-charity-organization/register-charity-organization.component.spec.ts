import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCharityOrganizationComponent } from './register-charity-organization.component';

describe('RegisterCharityOrganizationComponent', () => {
  let component: RegisterCharityOrganizationComponent;
  let fixture: ComponentFixture<RegisterCharityOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCharityOrganizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCharityOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
