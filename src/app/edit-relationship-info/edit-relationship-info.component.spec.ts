import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRelationshipInfoComponent } from './edit-relationship-info.component';

describe('EditRelationshipInfoComponent', () => {
  let component: EditRelationshipInfoComponent;
  let fixture: ComponentFixture<EditRelationshipInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRelationshipInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRelationshipInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
