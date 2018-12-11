import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ServiceActionsObject } from '../workspace-objects';
import { WorkspaceDashboardService } from '../workspace-dashboard/workspace-dashboard.service';
@Component({
  selector: 'app-workspace-dashboard',
  templateUrl: './workspace-dashboard.component.html',
  styleUrls: ['./workspace-dashboard.component.css']
})
export class WorkspaceDashboardComponent implements OnInit {
  serviceActionsList: ServiceActionsObject[] = [];

  constructor() {
  }
  ngOnInit() {

  }
  receiveServiceActionsListEvent($event) {
    this.serviceActionsList = $event;
    console.log('Dashboardcalling', this.serviceActionsList);
  }
}
