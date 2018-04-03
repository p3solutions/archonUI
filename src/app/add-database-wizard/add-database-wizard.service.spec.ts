import { TestBed, inject } from '@angular/core/testing';

import { AddDatabaseWizardService } from './add-database-wizard.service';

describe('AddDatabaseWizardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddDatabaseWizardService]
    });
  });

  it('should be created', inject([AddDatabaseWizardService], (service: AddDatabaseWizardService) => {
    expect(service).toBeTruthy();
  }));
});
