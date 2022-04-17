import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDonationDialogComponent } from './custom-donation-dialog.component';

describe('CustomDonationDialogComponent', () => {
  let component: CustomDonationDialogComponent;
  let fixture: ComponentFixture<CustomDonationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomDonationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDonationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
