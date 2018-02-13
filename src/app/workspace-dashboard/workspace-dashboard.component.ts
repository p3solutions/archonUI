import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { serviceActionsPojo } from '../WorkspacePojo';
import { WorkspaceDashboardService } from '../workspace-dashboard/workspace-dashboard.service';
@Component({
  selector: 'app-workspace-dashboard',
  templateUrl: './workspace-dashboard.component.html',
  styleUrls: ['./workspace-dashboard.component.css']
})
export class WorkspaceDashboardComponent implements OnInit {
  serviceActionsList: serviceActionsPojo[] = [];
  name : string = "chandru ashwin";
  // @Output() passServiceActions: any = new EventEmitter<any>();

  constructor(){
  }
  ngOnInit() {

  }
  receiveServiceActionsListEvent($event) {
    console.log("Dashboardcalling")
    this.serviceActionsList = $event;
    console.log(this.serviceActionsList);
    // this.passServiceActions.emit(this.serviceActionsList);

  }
}
