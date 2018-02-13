import { Component, OnChanges, Input, OnInit, SimpleChanges, SimpleChange } from '@angular/core';
import { ServiceActionsPojo } from '../WorkspacePojo';
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
  private serviceActions: ServiceActionsPojo[];
  constructor(private workspaceService: WorkspaceServicesService) { }

  // ngOnChanges(changes: SimpleChanges) {
  //   const serviceActions: SimpleChange = changes.serviceActions;
  //   const serviceActionArray = serviceActions.currentValue;
  //   console.log(serviceActionArray, "updated serviceActionArray");
  // }
  ngOnInit() {
    this.workspaceService.serviceActionUpdated.subscribe(
      (serviceActions) => {
        this.serviceActions = serviceActions;
      });
  }
}
