import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderPanelComponent } from './header-panel.component';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('HeaderPanelComponent', () => {
  let component: HeaderPanelComponent;
  let fixture: ComponentFixture<HeaderPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderPanelComponent
       ],
       providers:[{ provide: EnvironmentService, useClass: MockEnvironmentService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
