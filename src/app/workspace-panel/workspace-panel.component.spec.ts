import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspacePanelComponent } from './workspace-panel.component';
import { RouterTestingModule } from '@angular/router/testing';

xdescribe('WorkspacePanelComponent', () => {
  let component: WorkspacePanelComponent;
  let fixture: ComponentFixture<WorkspacePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ WorkspacePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspacePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
