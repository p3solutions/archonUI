import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkspaceServicesService } from '../workspace-services/workspace-services.service';
import { ServiceActionsObject } from '../workspace-objects';

@Component({
  selector: 'app-status-screen',
  templateUrl: './status-screen.component.html',
  styleUrls: ['./status-screen.component.css']
})
export class StatusScreenComponent implements OnInit {
  statusList: any;
  serviceActions = [];
  jobStatusList = new Set();
  currentService: any;
  currentJobStatus: any;

  constructor(
    private router: Router,
    private workspaceService: WorkspaceServicesService
  ) { }

  ngOnInit() {
    this.getStatusList();
    this.getServiceActions();
  }

  gotoBack() {
    this.router.navigate(['workspace/management-panel']);
  }

  getStatusList() {
    this.statusList = [
      {
        jobId: '3b305afd',
        scheduledTime: 1526328703470,
        startTime: 1526328703470,
        endTime: 1526328704470,
        status: 'completed'
      },
      {
        jobId: '3b305afe',
        scheduledTime: 1526328784470,
        startTime: 15261279723478,
        endTime: 1526328704470,
        status: 'failed'
      },
      {
        jobId: '3b305aff',
        scheduledTime: 1526378783478,
        startTime: 1526381252998,
        endTime: 1626499383778,
        status: 'running'
      },
      {
        jobId: '3b305afa',
        scheduledTime: 1526378783478,
        startTime: 1526479783478,
        endTime: 1626499733778,
        status: 'completed'
      },
      {
        jobId: '3b305afe',
        scheduledTime: 1526328784470,
        startTime: 15261279723478,
        endTime: 1526328704470,
        status: 'failed'
      },
      {
        jobId: '3b305aff',
        scheduledTime: 1526378783478,
        startTime: 1526381252998,
        endTime: 1626499383778,
        status: 'running'
      },
      {
        jobId: '3b305afa',
        scheduledTime: 1526378783478,
        startTime: 1526479783478,
        endTime: 1626499733778,
        status: 'completed'
      },
      {
        jobId: '3b305afe',
        scheduledTime: 1526328784470,
        startTime: 15261279723478,
        endTime: 1526328704470,
        status: 'failed'
      },
      {
        jobId: '3b305aff',
        scheduledTime: 1526378783478,
        startTime: 1526381252998,
        endTime: 1626499383778,
        status: 'running'
      },
      {
        jobId: '3b305afa',
        scheduledTime: 1526378783478,
        startTime: 1526479783478,
        endTime: 1626499733778,
        status: 'completed'
      },
      {
        jobId: '3b305afa',
        scheduledTime: 1526378783478,
        startTime: 1526479783478,
        endTime: 1626499733778,
        status: 'completed'
      },
      {
        jobId: '3b305afe',
        scheduledTime: 1526328784470,
        startTime: 15261279723478,
        endTime: 1526328704470,
        status: 'failed'
      },
      {
        jobId: '3b305aff',
        scheduledTime: 1526378783478,
        startTime: 1526381252998,
        endTime: 1626499383778,
        status: 'running'
      },
      {
        jobId: '3b305afa',
        scheduledTime: 1526378783478,
        startTime: 1526479783478,
        endTime: 1626499733778,
        status: 'completed'
      }
    ];
    this.statusList.forEach(status => {
      this.jobStatusList.add(status.status);
    });
    console.log(this.jobStatusList);
  }

  getServiceActions() {
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
  // filter for services
  selectService(selectedItem) {
    this.currentService = selectedItem;
  }
  // filter for job status
  selectJobStatus(selectedItem) {
    this.currentJobStatus = selectedItem;
  }
  showStatusInfo(jobId) {
    
  }
}
