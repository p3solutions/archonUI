import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshipListComponent } from './relationship-list.component';

describe('RelationshipListComponent', () => {
  let component: RelationshipListComponent;
  let fixture: ComponentFixture<RelationshipListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationshipListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
