import { Component, OnChanges, Input, OnInit, SimpleChanges, SimpleChange, ViewChild, ElementRef } from '@angular/core';
import { ServiceActionsObject } from '../workspace-objects';
import { WorkspaceDashboardService } from '../workspace-dashboard/workspace-dashboard.service';
import { WorkspaceServicesService } from './workspace-services.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserinfoService } from '../userinfo.service';
import { MetalyzerHeaderService } from '../metalyzer-header/metalyzer-header.service';
import { TableListService } from '../table-list/table-list.service';
import { CommonUtilityService } from '../common-utility.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { UserProfileService } from '../user-profile/user-profile.service';
import { NavbarService } from '../shared/navbar/navbar.service';
import { CookieService } from 'ngx-cookie-service';
import { UserWorkspaceService } from '../user-workspace.service';
import { addAllToArray } from '@angular/core/src/render3/util';
import { getUserId } from '../adhoc-landing-page/adhoc-utility-fn';
import { PermissionService } from '../permission-utility-functions/permission.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  showMessage = 'No access to any services. Please contact owner of workspace to get access.';
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
    private spinner: NgxSpinnerService,
    private activatedrouter: ActivatedRoute
  ) {
    activatedRouter.params.subscribe(val => {
      this.workspaceService.userSelectedWorkspace.subscribe((serviceActions: ServiceActionsObject[]) => {
        const serviceActionsList = this.workspaceService.updateServiceActionsList(serviceActions);
        this.serviceActions = serviceActionsList;
        const carousel: any = $('#serviceCarousel');
        carousel.carousel({ 'interval': false });
        this.spinner.hide();
        this.isAnyServiceEnable = this.serviceActions.filter(a => a.enableService === true).length !== 0 ? true : false;
      });
      this.getUpdatedService();
    });
  }

  ngOnInit() {
    const test = new NavbarComponent(this.userProfileService, this.navService, this.userinfoService,
      this.router, this.activatedRouter, null, null);
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
      this.router.navigate(['/workspace/adhoc']);
    }
  }

  toggleCard(cardId, toShow, _event) {
    this.commonUtilityService.toggleFlexCard(cardId, toShow, _event);
  }


  getUpdatedService() {
    this.spinner.show();
    const selectedWorkspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
    try {
      this.userWorkspaceService.getUserWorkspaceList().subscribe(res => {
        if (res && selectedWorkspaceId) {
          const selectedWorkspace = res.filter(a => a.id === selectedWorkspaceId)[0];
          if (selectedWorkspace) {
            const currentWorkspaceForUser = JSON.parse(JSON.stringify(selectedWorkspace.members.
              filter(a => a.user.id === getUserId())[0]));
            const userServiceActions = JSON.parse(JSON.stringify(currentWorkspaceForUser.serviceActions));

            const serviceActionsList = this.workspaceService.updateServiceActionsList(userServiceActions);
            // update service action for particular user.
            this.workspaceService.updateServiceActions(serviceActionsList);
            // update workspace list because services might be updated.
            this.workspaceHeaderService.updateWorkspaceList(res);
            // update for the workspace permission.
            this.permissionService.updateSelectedWorkspaceObj(currentWorkspaceForUser);

            this.isAnyServiceEnable = this.serviceActions.filter(a => a.enableService === true).length !== 0 ? true : false;

          }
        }
        this.spinner.hide();
      });
    } catch {
      this.spinner.hide();
    }
  }

}
