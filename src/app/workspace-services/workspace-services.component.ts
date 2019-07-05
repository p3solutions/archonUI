import { Component, OnChanges, Input, OnInit, SimpleChanges, SimpleChange } from '@angular/core';
import { ServiceActionsObject } from '../workspace-objects';
import { WorkspaceDashboardService } from '../workspace-dashboard/workspace-dashboard.service';
import { WorkspaceServicesService } from './workspace-services.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserinfoService } from '../userinfo.service';
import { MetalyzerHeaderService } from '../metalyzer-header/metalyzer-header.service';
import { TableListService } from '../table-list/table-list.service';
import { CommonUtilityService } from '../common-utility.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserProfileService } from '../user-profile/user-profile.service';
import { NavbarService } from '../navbar/navbar.service';
import { CookieService } from 'ngx-cookie-service';
import { UserWorkspaceService } from '../user-workspace.service';
import { addAllToArray } from '@angular/core/src/render3/util';
import { getUserId } from '../adhoc-landing-page/adhoc-utility-fn';
import { PermissionService } from '../permission-utility-functions/permission.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-workspace-services',
  templateUrl: './workspace-services.component.html',
  styleUrls: ['./workspace-services.component.css']
})
export class WorkspaceServicesComponent implements OnInit {
  // @Input() private serviceActions: serviceActionsPojo[];
  // @Input() private serviceName : string;
  // @Input() private serviceId : string;
  // @Input() private serviceType : string;
  serviceActions: ServiceActionsObject[];
  private wsId_Mode: string;
  private tableList: any;
  workspaceID: any;
  startIndex = 1;
  isAnyServiceEnable = true;
  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private workspaceService: WorkspaceServicesService,
    private userInfoService: UserinfoService,
    private workspaceHeaderService: WorkspaceHeaderService,
    private metalyzerHeaderService: MetalyzerHeaderService,
    private tableListService: TableListService,
    private commonUtilityService: CommonUtilityService,
    private userProfileService: UserProfileService,
    private navService: NavbarService,
    private userinfoService: UserinfoService,
    private cookieService: CookieService,
    private userWorkspaceService: UserWorkspaceService,
    private permissionService: PermissionService,
    private spinner: NgxSpinnerService
  ) {
    activatedRouter.params.subscribe(val => {
      this.workspaceService.userSelectedWorkspace.subscribe((serviceActions: ServiceActionsObject[]) => {
        const serviceActionsList = this.workspaceService.updateServiceActionsList(serviceActions, '');
        this.serviceActions = serviceActionsList;
        const carousel: any = $('#serviceCarousel');
        carousel.carousel({ 'interval': false });
        this.getUpdatedService();
      });
    });
  }

  ngOnInit() {
    const test = new NavbarComponent(this.userProfileService, this.navService, this.userinfoService, this.router);
    test.loadfirst = 0;
    test.getNotification();
    this.workspaceHeaderService.updateCheckActiveTab('Services');
    this.isAnyServiceEnable = this.serviceActions.filter(a => a.enableService === true).length !== 0 ? true : false;
  }

  gotoMetalyzer(service: any) {
    this.workspaceID = this.workspaceHeaderService.getSelectedWorkspaceId();
    if (service.serviceName === 'Metalyzer') {
      this.metalyzerHeaderService.setWorkspaceId(this.workspaceHeaderService.getSelectedWorkspaceId());
      this.tableListService.setServiceActionType(service.serviceActionType);
      if (service.serviceActionType === 'READ') {
        this.router.navigate(['/workspace/metalyzer/READ/analysis']);
      } else if (service.serviceActionType === 'WRITE' || service.serviceActionType === 'ALL') {
        this.tableListService.getTableList(this.workspaceID, this.startIndex).subscribe((result: any) => {
          this.tableList = result.tableList;
          if (this.tableList !== undefined) {
            this.metalyzerHeaderService.setPhase('Analysis');
            this.router.navigate(['/workspace/metalyzer/ALL/analysis']);
          } else {
            this.metalyzerHeaderService.setPhase('Configuration');
            this.router.navigate(['/workspace/metalyzer/ALL/configuration']);
          }
        });
      }
    } else if (service.serviceName === 'RDBMS Extractor') {
      this.router.navigate(['/workspace/db-extractor']);
    } else if (service.serviceName === 'ERT') {
      this.router.navigate(['/workspace/ert']);
    } else if (service.serviceName === 'IA Adhoc Query Builder') {
      this.cookieService.delete('workspaceId');
      this.cookieService.delete('workspaceName');
      this.cookieService.set('workspaceId', this.workspaceHeaderService.getSelectedWorkspaceId());
      this.cookieService.set('workspaceName', this.workspaceHeaderService.getSelectedWorkspaceName());
      this.router.navigate(['/workspace/adhoc']);
    }
  }

  toggleCard(cardId, toShow, _event) {
    this.commonUtilityService.toggleFlexCard(cardId, toShow, _event);
  }

  getUpdatedService() {
    try {
      this.spinner.show();
      const selectedWorkspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
      this.userWorkspaceService.getUserWorkspaceList().subscribe(res => {
        if (res && selectedWorkspaceId) {
          const selectedWorkspace = res.filter(a => a.id === selectedWorkspaceId)[0];
          if (selectedWorkspace) {
            const userServiceActions = JSON.parse(JSON.stringify(selectedWorkspace.members.
              filter(a => a.user.id === getUserId())[0].serviceActions));
            const metalyzerAccess = userServiceActions.filter(a => a.serviceName.trim().toUpperCase()
              === 'SERVICE_METALYZER')[0].enableService;
            const adhocAccess = userServiceActions.filter(a => a.serviceName.trim().toUpperCase()
              === 'SERVICE_IA_ADHOC_QUERY_BUILDER')[0].enableService;
            const ertAccess = userServiceActions.filter(a => a.serviceName.trim().toUpperCase()
              === 'SERVICE_ENTERPRISE_DATA_RETRIEVAL_TOOL')[0].enableService;
            const rdbmsAccess = userServiceActions.filter(a => a.serviceName.trim().toUpperCase()
              === 'SERVICE_DB_EXTRACTOR')[0].enableService;
            this.serviceActions.filter(a => a.serviceName.trim() === 'Metalyzer')[0].enableService = metalyzerAccess;
            this.serviceActions.filter(a => a.serviceName.trim() === 'IA Adhoc Query Builder')[0].enableService = adhocAccess;
            this.serviceActions.filter(a => a.serviceName.trim() === 'ERT')[0].enableService = ertAccess;
            this.serviceActions.filter(a => a.serviceName.trim() === 'RDBMS Extractor')[0].enableService = rdbmsAccess;
            this.isAnyServiceEnable = this.serviceActions.filter(a => a.enableService === true).length !== 0 ? true : false;
            this.permissionService.updateSelectedWorkspaceObj(JSON.parse(JSON.stringify(selectedWorkspace.members.
              filter(a => a.user.id === getUserId())[0])));
          }
        }
        this.spinner.hide();
      });
    } catch {
      this.spinner.hide();
    }
  }
}
