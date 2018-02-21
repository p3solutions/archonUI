import { Component, OnInit } from '@angular/core';
import { UserObject, AnyObject } from '../workspace-objects';
import { UserinfoService } from '../userinfo.service';

@Component({
  selector: 'app-new-workspace',
  templateUrl: './new-workspace.component.html',
  styleUrls: ['./new-workspace.component.css']
})
export class NewWorkspaceComponent implements OnInit {
  wsName: string;
  loggedInUser: UserObject;
  today = new Date();
  wsParam: AnyObject = {};
  databaseIds: string[];
  wsNameEmpty = false;
  constructor(
    private userinfoService: UserinfoService
  ) { }

  ngOnInit() {
    this.documentReadyFn();
  }

  documentReadyFn() {
    this.loggedInUser = this.userinfoService.getLoggedInUserFromAccessToken();
    document.getElementById('openCreateWSmodal').click();
    // $('#createWSModal-carousel').carousel({
    //   interval: false
    // });
  }
  addClass(elementId, classSelector) {
    document.getElementById(elementId).classList.add(classSelector);
  }
  removeClass(elementId, classSelector) {
    document.getElementById(elementId).classList.remove(classSelector);
  }

  prevStep(e) {
    if (document.querySelector('.second').classList.contains('active')) {
      this.addClass('prev-btn', 'hide');
      this.removeClass('cancel-btn', 'hide');
    } else if (document.querySelector('.final').classList.contains('active')) {
      this.addClass('create-btn', 'hide');
      this.removeClass('next-btn', 'hide');
    }
    document.getElementById('prev-slide').click();
  }

  nextStep(e) {
    if (!this.wsName) {
      this.wsNameEmpty = true;
      document.getElementById('wsName').focus();
      e.stopPropagation();
    } else {
      if (document.querySelector('.second-last').classList.contains('active')) {
        this.removeClass('create-btn', 'hide');
        this.addClass('next-btn', 'hide');
      }
      document.getElementById('next-slide').click();
      this.removeClass('prev-btn', 'hide');
      this.addClass('cancel-btn', 'hide');
    }
  }

  createWS() {
    this.wsParam.workspaceName = this.wsName;
    if (this.databaseIds && this.databaseIds.length > 0) {
      this.wsParam.databaseIds = this.databaseIds;
    } else {
      // throw error
    }
    console.log(this.wsParam);
  }
}
