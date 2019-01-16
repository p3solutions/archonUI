import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddDatabaseWizardComponent } from './add-database-wizard.component';
import { UserWorkspaceService } from '../user-workspace.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';

// Reason for disabling: screen greys out on test case
xdescribe ('AddDatabaseWizardComponent', () => {
  let component: AddDatabaseWizardComponent;
  let fixture: ComponentFixture<AddDatabaseWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDatabaseWizardComponent ],
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
      providers: [UserWorkspaceService, UserinfoService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDatabaseWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
