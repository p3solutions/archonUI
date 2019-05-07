import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshipInfoComponent } from './relationship-info.component';
import { RelationshipListComponent } from '../relationship-list/relationship-list.component';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('RelationshipInfoComponent', () => {
  let component: RelationshipInfoComponent;
  let fixture: ComponentFixture<RelationshipInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationshipInfoComponent, RelationshipListComponent], providers: [{ provide: EnvironmentService, useClass: MockEnvironmentService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshipInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
