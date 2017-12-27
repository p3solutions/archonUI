import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Workspaceinfo } from '../workspaceinfo';
import { WorkspaceInfoComponent } from './workspace-info.component';
import { WorkspaceinfoService } from '../workspaceinfo.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

// describe('WorkspaceInfoComponent', () => {
//   let component: WorkspaceInfoComponent;
//   let fixture: ComponentFixture<WorkspaceInfoComponent>;
//   // tslint:disable-next-line:prefer-const
//    let workInfoData: Workspaceinfo;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [ HttpClientTestingModule ],
//       providers: [WorkspaceinfoService],
//       declarations: [ WorkspaceInfoComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(WorkspaceInfoComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   describe('getworkinfo()', () => {
//       it('should return an Observable data for workspace-info component',
//         inject( [WorkspaceinfoService], (workspaceInfoService) => {
//           workspaceInfoService.getworkinfo().subscribe(workspaceInfoData => {
//             console.log('testing-testing ', this.workspaceInfoData);
//           });
//         }));
//     });
// });


describe('WorkspaceInfoComponent', () => {
  let component: WorkspaceInfoComponent;
  let fixture: ComponentFixture<WorkspaceInfoComponent>;
  // tslint:disable-next-line:prefer-const
   let workInfoData: Workspaceinfo;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
       imports: [ HttpClientTestingModule ],
       providers: [WorkspaceinfoService],
      declarations: [ WorkspaceInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // describe('getworkinfo()', () => {
  //     it('should return an Observable data for workspace-info component',
  //       inject( [WorkspaceinfoService], (workspaceInfoService) => {
  //         workspaceInfoService.getworkinfo().subscribe(workspaceInfoData => {
  //           console.log('testing-testing ', workspaceInfoData);
  //         });
  //       }));
  //   });
});

