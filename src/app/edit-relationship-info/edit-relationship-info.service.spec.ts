import { TestBed, inject } from '@angular/core/testing';

import { EditRelationshipInfoService } from './edit-relationship-info.service';

describe('EditRelationshipInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditRelationshipInfoService]
    });
  });

  it('should be created', inject([EditRelationshipInfoService], (service: EditRelationshipInfoService) => {
    expect(service).toBeTruthy();
  }));
});