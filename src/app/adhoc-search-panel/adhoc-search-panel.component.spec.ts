import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocSearchPanelComponent } from './adhoc-search-panel.component';
import {
  MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule,
  MatCardModule, MatTreeModule, MatRadioModule, MatExpansionModule, MatTabsModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserinfoService } from '../userinfo.service';
describe('AdhocSearchPanelComponent', () => {
  let component: AdhocSearchPanelComponent;
  let fixture: ComponentFixture<AdhocSearchPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdhocSearchPanelComponent ],
            imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatCardModule, MatTreeModule, MatRadioModule, MatExpansionModule
        , MatOptionModule, HttpClientTestingModule, RouterTestingModule,
        MatSelectModule, MatInputModule, DragDropModule, MatTabsModule, BrowserAnimationsModule],
        providers: [UserinfoService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhocSearchPanelComponent);
    component = fixture.componentInstance;
    spyOn(component.router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
