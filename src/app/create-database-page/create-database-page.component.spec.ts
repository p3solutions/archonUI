import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDatabasePageComponent } from './create-database-page.component';

describe('CreateDatabasePageComponent', () => {
  let component: CreateDatabasePageComponent;
  let fixture: ComponentFixture<CreateDatabasePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDatabasePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDatabasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
