import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Workspaceinfo } from '../workspaceinfo';
import { WorkspaceInfoComponent } from './workspace-info.component';
import { WorkspaceinfoService } from '../workspaceinfo.service';


// describe('WorkspaceInfoComponent', () => {
//   let component: WorkspaceInfoComponent;
//   let fixture: ComponentFixture<WorkspaceInfoComponent>;
//   // tslint:disable-next-line:prefer-const
//   let info: Workspaceinfo;
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ WorkspaceInfoComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(WorkspaceInfoComponent);
//     component = fixture.componentInstance;
//     imports: [HttpClientModule],
//     providers: [WorkspaceinfoService]
//     fixture.detectChanges();
//   });
//   console.log(this.info);

//   // getWorkspaceInfo(): void {
//   //   this.workspaceinfoservice.getworkinfo(this.workspaceinfoservice.workspaceinfoUrl).subscribe(info => {
//   //     this.info = info;
//   //     console.log(JSON.stringify(this.info));

//   //   });


//     describe('getWorkspaceInfo()', () => {
//       it('should return an Observable<Array<MemberRequestDetail>>',
//         inject([], (Workspaceinfo) => {
//           WorkspaceinfoService.getMemberRequestDetails().subscribe(memberData => {
//             console.log(memberData);


// });





import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { MemberRequestComponent } from './member-request.component';
// import { MemberRequestService } from '../member-request.service';
// import { MemberRequestData } from '../member-request-data';
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

  describe('getworkinfo()', () => {
      it('should return an Observable data for workspace-info component',
        inject( [WorkspaceinfoService], (workspaceInfoService) => {
          workspaceInfoService.getworkinfo().subscribe(workspaceInfoData => {
            console.log('testing-testing ', this.workspaceInfoData);
          });
        }));
    });
});
