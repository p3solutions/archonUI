import { Component, OnChanges, Input, OnInit, SimpleChanges, SimpleChange } from '@angular/core';
import { ServiceActionsObject } from '../workspace-objects';
import { WorkspaceDashboardService } from '../workspace-dashboard/workspace-dashboard.service';
import { WorkspaceServicesService } from './workspace-services.service';

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
  constructor(
    private workspaceService: WorkspaceServicesService
  ) { }

  // ngOnChanges(changes: SimpleChanges) {
  //   const serviceActions: SimpleChange = changes.serviceActions;
  //   const serviceActionArray = serviceActions.currentValue;
  //   console.log(serviceActionArray, "updated serviceActionArray");
  // }
  ngOnInit() {
    this.workspaceService.serviceActionUpdated.subscribe(
      (serviceActions) => {
        serviceActions.forEach(service => {
          service.name = service.serviceName.replace('SERVICE', '').split('_').join(' ');
        });
        this.serviceActions = serviceActions;
        for (const service of this.serviceActions) {
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
      });
  }
}
