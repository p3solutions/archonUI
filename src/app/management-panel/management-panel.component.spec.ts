import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementPanelComponent } from './management-panel.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonUtilityService } from '../common-utility.service';
import { SearchPipe } from '../search.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatCardModule, MatInputModule } from '@angular/material';

describe('ManagementPanelComponent', () => {
  let component: ManagementPanelComponent;
  let fixture: ComponentFixture<ManagementPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementPanelComponent , SearchPipe],
      imports: [RouterTestingModule, MatFormFieldModule, MatCardModule, MatInputModule, BrowserAnimationsModule],
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
