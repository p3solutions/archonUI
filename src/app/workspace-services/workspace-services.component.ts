import { Component, OnChanges, Input, OnInit, SimpleChanges, SimpleChange } from '@angular/core';
import { ServiceActionsObject } from '../workspace-objects';
import { WorkspaceDashboardService } from '../workspace-dashboard/workspace-dashboard.service';
import { WorkspaceServicesService } from './workspace-services.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserinfoService } from '../userinfo.service';
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
  private serviceActions: ServiceActionsObject[];
  private wsId_Mode: string;
  constructor(
    private router: Router,
    private workspaceService: WorkspaceServicesService,
    private userInfoService: UserinfoService,
    private workspaceHeaderService: WorkspaceHeaderService
  ) { }

  gotoMetalyzer(service: any) {
    if (service.serviceName === 'Metalyzer') {
      this.wsId_Mode = this.workspaceHeaderService.getSeletectedWorkspace().concat('_', service.serviceActionType);
      this.router.navigate(['workspace/metalyzer', this.wsId_Mode]);
    }
  }
  ngOnInit() {
    this.workspaceService.serviceActionsUpdated.subscribe(
      (serviceActions) => {
        this.serviceActions = this.updateServiceActions(serviceActions);
      });
  }
  updateServiceActions(serviceActions: ServiceActionsObject[]): ServiceActionsObject[] {
    for (const service of serviceActions) {
      switch (service.serviceName) {
        case 'SERVICE_METALYZER': {
          service.serviceName = 'Metalyzer';
          break;
        }
        case 'SERVICE_LIVE_ARCHIVAL': {
          service.serviceName = 'Live Archival';
          break;
        }
        case 'SERVICE_CUSTOM_SCREEN_BUILDING': {
          service.serviceName = 'Custom Screen Building';
          break;
        }
        case 'SERVICE_END_2_END_TOOLKIT': {
          service.serviceName = 'End to End Toolkit';
          break;
        }
        case 'SERVICE_ENTERPRISE_DATA_RETRIEVAL_TOOL': {
          service.serviceName = 'Enterprise Data Retrieval Tool';
          break;
        }
        case 'SERVICE_INFOARCHIVE_COMPLETE_APPLICATION_AUTOMATION': {
          service.serviceName = 'InfoArchive Complete Application Automation';
          break;
        }
        case 'SERVICE_UNSTRUCTURED_DATA_ EXTRACTOR': {
          service.serviceName = 'Unstructured Data Extractor';
          break;
        }
        // default: {
        //   service.serviceName = 'No Service Available';
        //   break;
        // }
      }
    }
    return serviceActions;
  }
}
