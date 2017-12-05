import { TestBed, inject } from '@angular/core/testing';

import { WorkspaceinfoService } from './workspaceinfo.service';

describe('WorkspaceinfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkspaceinfoService]
    });
  });

  it('should be created', inject([WorkspaceinfoService], (service: WorkspaceinfoService) => {
    expect(service).toBeTruthy();
  }));
});
