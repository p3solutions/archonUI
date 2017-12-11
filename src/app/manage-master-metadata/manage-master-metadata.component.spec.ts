import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMasterMetadataComponent } from './manage-master-metadata.component';

describe('ManageMasterMetadataComponent', () => {
  let component: ManageMasterMetadataComponent;
  let fixture: ComponentFixture<ManageMasterMetadataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageMasterMetadataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMasterMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
