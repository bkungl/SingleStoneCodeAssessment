import { TestBed } from '@angular/core/testing';

import { RESTServiceService } from './restservice.service';

describe('RESTServiceService', () => {
  let service: RESTServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RESTServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
