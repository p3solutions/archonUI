import { TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { WorkspaceinfoService } from './workspaceinfo.service';
import { HttpClient} from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Workspaceinfo } from './workspaceinfo';
import { HttpClientModule } from '@angular/common/http';

describe('WorkspaceinfoService', () => {
  // tslint:disable-next-line:prefer-const
  let workspaceInfoService: WorkspaceinfoService;
  // tslint:disable-next-line:prefer-const
  let workspace_info_observable: Observable<Workspaceinfo>;
  // tslint:disable-next-line:prefer-const
  // let info: Workspaceinfo;
   
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [WorkspaceinfoService]
    });
  });

  // it('it should get workspace-info data for workspace-info components', inject([HttpClient],

  //   getWorkspaceInfo(): void {
  //     this.workspaceinfoservice.getworkinfo(this.workspaceinfoservice.workspaceinfoUrl).subscribe(info => {
  //       this.info = info;
  //       console.log(JSON.stringify(this.info));
  
  //     });

  //   (http: HttpClient) => {
  //     workspaceInfoService = new WorkspaceinfoService(http);
  //     console.log(workspaceInfoService.getworkinfo);
  //     workspace_info_observable = workspaceInfoService.getworkinfo(workspaceInfoService.workspaceinfoUrl);
  //     console.log('testing', workspace_info_observable);
  //     // console.log(this.info);
  //     expect(workspace_info_observable).toBeTruthy();
  // }));

});
