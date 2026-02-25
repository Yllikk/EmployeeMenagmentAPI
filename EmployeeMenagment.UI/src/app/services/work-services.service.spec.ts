import { TestBed } from '@angular/core/testing';

import { WorkServicesService } from './work-services.service';

describe('WorkServicesService', () => {
  let service: WorkServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
