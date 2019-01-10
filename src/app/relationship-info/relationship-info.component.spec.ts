import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshipInfoComponent } from './relationship-info.component';

describe('RelationshipInfoComponent', () => {
  let component: RelationshipInfoComponent;
  let fixture: ComponentFixture<RelationshipInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationshipInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshipInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
