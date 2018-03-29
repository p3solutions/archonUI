import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-database-wizard',
  templateUrl: './add-database-wizard.component.html',
  styleUrls: ['./add-database-wizard.component.css']
})
export class AddDatabaseWizardComponent implements OnInit {
  wsName: string;
  wsDesc: string;
  // loggedInUser: UserObject;
  today = new Date();
  // wsParam: AnyObject = {};
  // supportedDBs: ConfiguredDB[] = [];
  wsNameEmpty = false;
  isDBAvailable= false;
  // newWSinfo: WorkspaceObject;
  databaseIds: string[] = [];
  // selectedDBList: ConfiguredDB[] = [];
  errorDBselect = false;
  DBtable: any;
  selectedDBtable: any;
  constructor() { }

  ngOnInit() {
    this.documentReadyFn();
  }

  documentReadyFn() {
    // this.loggedInUser = this.userinfoService.getLoggedInUserFromAccessToken();
    document.getElementById('openCreateAddDBmodal').click();
    // this.getSupportedDBs();
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
    this.handleStepIindicator(false);
  }

  nextStep(e) {
    if (!this.wsName) {
      this.wsNameEmpty = true;
      document.getElementById('wsName').focus();
      e.stopPropagation();
    } else {
      if (document.querySelector('.second-last').classList.contains('active') ) {
        if (true) { // selected at least one DB
          // restricting to select one, temporarily as per Backend team
          //  if (this.databaseIds.length > 1) {
          //   alert('Select only 1 DB. Multiple selection is prohibited temporarily!');
          //   return false;
          // }
          // end of restriction to 1 selection
          this.removeClass('create-btn', 'hide');
          this.addClass('next-btn', 'hide');
          document.getElementById('next-slide').click();
          this.handleStepIindicator(true);
        } else {
          this.errorDBselect = true; // make it false on click of chkbx
        }
      } else {
        document.getElementById('next-slide').click();
        this.handleStepIindicator(true);
        this.removeClass('prev-btn', 'hide');
        this.addClass('cancel-btn', 'hide');
      }
    }
  }

  handleStepIindicator(isNext) {
    const slideNo = $('.carousel-inner .item.active').attr('step');
    console.log('slideNo', slideNo, document.getElementById('progress-bar'));
    switch (slideNo) {
      case '0':
        if (isNext) {
          this.removeClass('progress-bar', 'width-5-pc');
          this.removeClass('progress-bar', 'width-33-pc-rev');
          this.addClass('progress-bar', 'width-33-pc');
        }
        break;
      case '1':
        if (isNext) {
          this.removeClass('progress-bar', 'width-33-pc');
          this.addClass('progress-bar', 'width-66-pc');
        } else {
          this.removeClass('progress-bar', 'width-66-pc-rev');
          this.addClass('progress-bar', 'width-33-pc-rev');
        }
        break;
      case '2':
        if (isNext) {
          this.removeClass('progress-bar', 'width-66-pc');
          this.addClass('progress-bar', 'width-100-pc');
        } else {
          this.removeClass('progress-bar', 'width-66-pc');
          this.addClass('progress-bar', 'width-66-pc-rev');
        }
        break;
      default:
        break;
    }
  }
  // createWS() {
  //   this.wsParam.workspaceName = this.wsName;
  //   this.wsParam.databaseIds = this.databaseIds;
  //   this.addClass('progress-bar', 'width-100-pc');
  //   this.userWorkspaceService.createNewWorkspace(this.wsParam).subscribe( res => {
  //     if (res) {
  //       this.newWSinfo = res;
  //       this.postCreation();
  //     }
  //   });
  // }

}
