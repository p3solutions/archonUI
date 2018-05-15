import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status-screen',
  templateUrl: './status-screen.component.html',
  styleUrls: ['./status-screen.component.css']
})
export class StatusScreenComponent implements OnInit {

  statusList: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.getStatusList();
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
      }
    ];
  }
}
