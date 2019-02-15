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
  defDesc = 'Description: Here is some more information about this product that is only revealed once clicked on.';
  serviceActions: ServiceActionsObject[];
  private wsId_Mode: string;
  private tableList: any;
  workspaceID: any;
  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private workspaceService: WorkspaceServicesService,
    private userInfoService: UserinfoService,
    private workspaceHeaderService: WorkspaceHeaderService,
    private metalyzerHeaderService: MetalyzerHeaderService,
    private tableListService: TableListService,
    private commonUtilityService: CommonUtilityService
  ) {
    activatedRouter.params.subscribe(val => {

      this.workspaceService.userSelectedWorkspace.subscribe((serviceActions: ServiceActionsObject[]) => {
        //   // hard-coded values for adhoc-query-builder,
        //   // NOTE: whenever this function is called it adds a duplicate of this hard-coded service object
        //   // serviceActions.push(
        //   //   {
        //   //     iconName: 'querybuilder.png',
        //   //     serviceActionType: 'ALL',
        //   //     serviceId: '5ac5c6d0a54d7503ad946537',
        //   //     serviceName: 'Adhoc Query Builder'
        //   //   }
        //   // );

        const serviceActionsList = this.workspaceService.updateServiceActionsList(serviceActions);
        this.serviceActions = this.commonUtilityService.groupOutArray(serviceActionsList, 3);
        const carousel: any = $('#serviceCarousel');
        carousel.carousel({ 'interval': false });

      });
      // setTimeout(() => {
      //   const dropdownItem = <HTMLAnchorElement>document.querySelectorAll('#selectedWorkspace .dropdown-data')[0];
      //   if (dropdownItem !== undefined) {
      //     const b = dropdownItem.click();
      //     if (b !== undefined) {
      //       const b1 = this.workspaceService.updateServiceActionsList(JSON.parse(JSON.stringify(b)));
      //       this.workspaceService.updateServiceActions(b1);
      //     }
      //   }
      // }, 3000);
    });
  }

  ngOnInit() {
    //  this.workspaceService.userSelectedWorkspace.subscribe((serviceActions: ServiceActionsObject[]) => {
    // //   // hard-coded values for adhoc-query-builder,
    // //   // NOTE: whenever this function is called it adds a duplicate of this hard-coded service object
    // //   // serviceActions.push(
    // //   //   {
    // //   //     iconName: 'querybuilder.png',
    // //   //     serviceActionType: 'ALL',
    // //   //     serviceId: '5ac5c6d0a54d7503ad946537',
    // //   //     serviceName: 'Adhoc Query Builder'
    // //   //   }
    // //   // );

    //   const serviceActionsList = this.updateServiceActions(serviceActions);
    //   this.serviceActions = this.commonUtilityService.groupOutArray(serviceActionsList, 3);
    //   const carousel: any = $('#serviceCarousel');
    //   carousel.carousel({ 'interval': false });
    //   // setTimeout(() => {

    //   // }, 9000);

    // });
  }

  gotoMetalyzer(service: any) {
    this.workspaceID = this.workspaceHeaderService.getSelectedWorkspaceId();
    if (service.serviceName === 'Metalyzer') {
      this.metalyzerHeaderService.setWorkspaceId(this.workspaceHeaderService.getSelectedWorkspaceId());
      this.tableListService.setServiceActionType(service.serviceActionType);
      if (service.serviceActionType === 'READ') {
        this.router.navigate(['/workspace/metalyzer/READ/analysis']);
      } else if (service.serviceActionType === 'WRITE' || service.serviceActionType === 'ALL') {
        this.tableListService.getTableList(this.workspaceID).subscribe(result => {
          this.tableList = result;
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
    }else if (service.serviceName === 'IA Adhoc Query Builder') {
      this.router.navigate(['/workspace/adhoc-drag']);
    }
    
  }

  toggleCard(cardId, toShow, _event) {
    this.commonUtilityService.toggleFlexCard(cardId, toShow, _event);
  }
}
