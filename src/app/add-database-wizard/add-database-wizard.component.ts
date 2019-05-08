import { Component, OnInit } from '@angular/core';
import { UserObject, AnyObject, ConfiguredDB, CreateConfigDBObject } from '../workspace-objects';
import { UserWorkspaceService } from '../user-workspace.service';
import { UserinfoService } from '../userinfo.service';
import { Router } from '@angular/router';
import { ErrorObject } from '../error-object';
import * as $ from 'jquery';


@Component({
  selector: 'app-add-database-wizard',
  templateUrl: './add-database-wizard.component.html',
  styleUrls: ['./add-database-wizard.component.css']
})
export class AddDatabaseWizardComponent implements OnInit {

  profileName = '';
  dbServer: string;
  dbServerList = [];
  databaseName = '';
  host = '';
  port: string;
  schemaName = '';
  userName = '';
  password = '';
  authType = 'JDBC';
  supportedDBId: string;
  selectedDBServerName = 'Select server';
  newWSinfo: CreateConfigDBObject;

  responseData: any;
  errorObject: ErrorObject;

  wsName: string;
  wsDesc: string;
  // loggedInUser: UserObject;
  today = new Date();
  dbParam: AnyObject = {};
  testDbParam: AnyObject = {};
  // supportedDBs: ConfiguredDB[] = [];
  wsNameEmpty = false;
  profileNameEmpty = false;
  isDBAvailable = false;
  // newWSinfo: WorkspaceObject;
  databaseIds: string[] = [];
  // selectedDBList: ConfiguredDB[] = [];
  errorDBselect = false;
  DBtable: any;
  selectedDBtable: any;
  dbTestConnectionSuccessMsg: string;
  dbTestConnectionErrorMsg: string;
  enableNextBtn = false;
  enableCreateBtn = false;
  step0Empty = false;
  step1Empty = false;
  createdb: boolean;
  inProgress = false;
  dbinProgress = false;
  constructor(
    private userWorkspaceService: UserWorkspaceService
  ) { }

  ngOnInit() {
    this.getAllDBServer();
    this.documentReadyFn();
  }

  testDbConnection() {
    this.inProgress = true;
    this.testDbParam.userName = this.userName;
    this.testDbParam.password = this.password;
    this.testDbParam.port = this.port;
    this.testDbParam.host = this.host;
    this.testDbParam.databaseName = this.databaseName;
    this.testDbParam.schemaName = this.schemaName;
    this.testDbParam.supportedDBId = this.supportedDBId;
    this.testDbParam.authType = this.authType;
    this.testDbParam.profileName = this.profileName;
    this.userWorkspaceService.checkDBConnection(this.testDbParam).subscribe((res: any) => {
      if (res) {
        this.inProgress = false;
        this.dbTestConnectionErrorMsg = res.connection.errorMessage;
        this.dbTestConnectionSuccessMsg = res.connection.message;
        if (res.connection.isConnected) {
          this.enableCreateBtn = true;
        }
      } else {
        this.inProgress = false;
        this.dbTestConnectionSuccessMsg = '';
        this.dbTestConnectionErrorMsg = 'Failed! Try again with correct DB configuration.';
      }
    });
  }

  selectDBServer(servername) {
    this.supportedDBId = servername.id;
    this.selectedDBServerName = servername.name;
    this.port = servername.defaultPort;

  }

  getAllDBServer() {
    this.userWorkspaceService.getAllSupportedDBServer().subscribe(res => {
      if (res) {
        this.dbServerList = res.applications.allowedDBs;
      }
    });
  }
  documentReadyFn() {
    // this.loggedInUser = this.userinfoService.getLoggedInUserFromAccessToken();
    document.getElementById('openCreateAddDBmodal').click();
    // this.getSupportedDBs();
  }
  step0Validation(_event) {
    if (!this.profileName.trim() || !this.host.trim() || !this.port || !this.databaseName.trim() || !this.schemaName.trim()) {
      this.step0Empty = false;
    } else if (this.selectedDBServerName === 'Select server') {
      this.step0Empty = false;
    } else {
      this.step0Empty = true;
    }
    this.enableDisableNextBtn();
  }
  step1Validation(_event) {
    if (!this.userName.trim() || !this.password.trim()) {
      this.step1Empty = false;
    } else {
      this.step1Empty = true;
    }
    this.enableDisableNextBtn();
  }
  enableDisableNextBtn() {
    const currentStep = $('.carousel-inner .item.active').attr('step');
    switch (currentStep) {
      case '0':
        this.enableNextBtn = this.step0Empty === true;
        break;
      case '1':
        this.enableNextBtn = this.step1Empty === true;
        break;
      case '2':
        // this.enableNextBtn = this.selectedSecCol.size > 0;
        break;
      // case '3':
      //   this.enableNextBtn = this.selectedPrimCol.size > 0;
      //   break;
      default:
        break;
    }
  }
  addClass(elementId, classSelector) {
    document.getElementById(elementId).classList.add(classSelector);
  }
  removeClass(elementId, classSelector) {
    document.getElementById(elementId).classList.remove(classSelector);
  }

  prevStep(e) {
    this.enableCreateBtn = false;
    this.dbTestConnectionSuccessMsg = undefined;
    this.dbTestConnectionErrorMsg = undefined;
    this.enableNextBtn = this.step0Empty === true;
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
    if (document.querySelector('.second-last').classList.contains('active')) {
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
      // } else {
      //   this.errorDBselect = true; // make it false on click of chkbx
      // }
    } else {
      document.getElementById('next-slide').click();
      this.handleStepIindicator(true);
      this.removeClass('prev-btn', 'hide');
      this.addClass('cancel-btn', 'hide');
    }
  }
  handleStepIindicator(isNext) {
    const slideNo = $('.carousel-inner .item.active').attr('step');
    switch (slideNo) {
      case '0':
        if (isNext) {
          this.removeClass('progress-bar', 'width-5-pc');
          this.removeClass('progress-bar', 'width-33-pc-rev');
          this.addClass('progress-bar', 'width-33-pc');
          this.enableNextBtn = this.step1Empty === true;
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

  // reset modal
  resetCarousel() {
    this.addClass('ok-btn', 'hide');
    document.getElementById('next-slide').click();
    this.removeClass('next-btn', 'hide');
    this.removeClass('cancel-btn', 'hide');
    this.newWSinfo = undefined;
    this.wsName = undefined;
    this.wsNameEmpty = false;
    this.wsDesc = undefined;
    this.dbParam.userName = undefined;
    this.userName = undefined;
    this.dbParam.port = undefined;
    this.port = undefined;
    this.dbParam.host = undefined;
    this.host = undefined;
    this.dbParam.databaseName = undefined;
    this.databaseName = undefined;
    this.dbParam.schemaName = undefined;
    this.schemaName = undefined;
    this.dbParam.profileName = undefined;
    this.profileName = undefined;
    this.dbTestConnectionSuccessMsg = undefined;
    this.dbTestConnectionErrorMsg = undefined;
    this.selectedDBServerName = 'Select server';
  }

  postCreation() {
    const thisComponent = this; // this is component's 'this'
    thisComponent.addClass('prev-btn', 'hide');
    thisComponent.addClass('create-btn', 'hide');
    thisComponent.removeClass('ok-btn', 'hide');
    document.getElementById('next-slide').click();
    document.getElementById('reload').click();
    // if (this.selectedDBtable) {
    //   this.selectedDBtable.destroy();
    // }
    // this.selectedDBtable = $('#selected-db-list-table').DataTable({
    //   // 'searching': false,
    //   'lengthMenu': [[5, 10, 25, 50, -1], [5, 10, 25, 50, 'All']],
    //   'ajax': function (data, callback, settings) { callback({data: thisComponent}); },
    //   'columns': [
    //     { 'data': 'databaseName' },
    //     { 'data': 'owner.name' },
    //     {
    //       'className': '',
    //       'orderable': false,
    //       'data': null,
    //       'defaultContent': 'Pending Approval',
    //       'title': 'Status'
    //     }
    //   ],
    //   'order': [[0, 'asc']]
    // });
  }

  createDBConfig() {
    this.dbinProgress = true;
    // this.dbParam.dbProfileName = this.dbProfileName;
      this.dbParam.userName = this.userName;
    this.dbParam.password = this.password;
    // this.dbParam.password = btoa(this.password);
    this.dbParam.port = this.port;
    this.dbParam.host = this.host;
    this.dbParam.databaseName = this.databaseName;
    this.dbParam.schemaName = this.schemaName;
    this.dbParam.supportedDBId = this.supportedDBId;
    this.dbParam.authType = this.authType;
    this.dbParam.profileName = this.profileName;
    this.addClass('progress-bar', 'width-100-pc');
    this.userWorkspaceService.checkDBConnection(this.testDbParam).subscribe((res: any) => {
      if (res) {
        if (res.connection.isConnected) {
          this.dbinProgress = false;
          this.createNewdb();
          this.createdb = true;
        } else {
          this.dbinProgress = false;
          this.dbTestConnectionErrorMsg = 'Unable to Create Database. Please Test Connection.';
        }
      } else {
        this.dbinProgress = false;
        this.dbTestConnectionErrorMsg = 'Unable to Create Database. Please Test Connection.';
      }
    });
    // window.location.reload();
    // this.router.navigate(['/workspace/database-list']);
  }
  createNewdb() {
    this.userWorkspaceService.createNewDBConfig(this.dbParam).subscribe(res => {
      if (res) {
        this.newWSinfo = res;
        // document.getElementById('populate-db-list').click();
        this.postCreation();
      }
    });
  }

}
