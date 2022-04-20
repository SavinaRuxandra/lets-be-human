import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveTransactionsComponent } from './live-transactions.component';

describe('LiveTransactionsComponent', () => {
  let component: LiveTransactionsComponent;
  let fixture: ComponentFixture<LiveTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
