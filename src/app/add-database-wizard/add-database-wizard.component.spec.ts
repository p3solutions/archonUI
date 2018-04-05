import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDatabaseWizardComponent } from './add-database-wizard.component';

describe('AddDatabaseWizardComponent', () => {
  let component: AddDatabaseWizardComponent;
  let fixture: ComponentFixture<AddDatabaseWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDatabaseWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDatabaseWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
