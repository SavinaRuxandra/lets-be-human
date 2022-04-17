import { TestBed } from '@angular/core/testing';

import { CharityOrganizationService } from './charity-organization.service';

describe('CharityOrganizationService', () => {
  let service: CharityOrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharityOrganizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
