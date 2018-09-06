import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUserRoleComponent } from './change-user-role.component';
import { ChangeUserRoleService } from './change-user-role.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('ChangeUserRoleComponent', () => {
  let component: ChangeUserRoleComponent;
  let fixture: ComponentFixture<ChangeUserRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeUserRoleComponent ],
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        // reference the new instance of formBuilder from above
        ChangeUserRoleService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeUserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
