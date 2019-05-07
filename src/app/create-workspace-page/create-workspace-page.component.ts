import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CdkStep } from '@angular/cdk/stepper';

@Component({
  selector: 'app-create-workspace-page',
  templateUrl: './create-workspace-page.component.html',
  styleUrls: ['./create-workspace-page.component.css']
})
export class CreateWorkspacePageComponent implements OnInit {
  constructor() { }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    const value = document.querySelectorAll('.mat-horizontal-stepper-header');
    value[0].querySelector('.mat-step-icon-content').innerHTML = '<i class="fa fa-copy"></i>';
    value[1].querySelector('.mat-step-icon-content').innerHTML = '<i class="fa fa-copy"></i>';
    value[2].querySelector('.mat-step-icon-content').innerHTML = '<i class="fa fa-copy"></i>';
  }
  ngOnInit() {
  }

}
