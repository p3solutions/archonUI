import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementPanelComponent } from './management-panel.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonUtilityService } from '../common-utility.service';

describe('ManagementPanelComponent', () => {
  let component: ManagementPanelComponent;
  let fixture: ComponentFixture<ManagementPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementPanelComponent ],
      imports: [RouterTestingModule],
      providers: [CommonUtilityService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
