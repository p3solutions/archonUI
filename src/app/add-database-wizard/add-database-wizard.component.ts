import { Component, OnInit } from '@angular/core';
import { UserObject, AnyObject, ConfiguredDB, CreateConfigDBObject } from '../workspace-objects';
import { UserWorkspaceService } from '../user-workspace.service';
import { UserinfoService } from '../userinfo.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-database-wizard',
  templateUrl: './add-database-wizard.component.html',
  styleUrls: ['./add-database-wizard.component.css']
})
export class AddDatabaseWizardComponent implements OnInit {

  profileName: string;
  dbServer: string;
  dbServerList: {};

  databaseName: string;
  host: string;
  port: string;
  schemaName: string;
  userName: string;
  password: string;
  authType = 'JDBC';
  supportedDBId: string;
  selectedDBServerName = 'Select server';
  newWSinfo: CreateConfigDBObject;

  wsName: string;
  wsDesc: string;
  // loggedInUser: UserObject;
  today = new Date();
  dbParam: AnyObject = {};
  // supportedDBs: ConfiguredDB[] = [];
  wsNameEmpty = false;
  isDBAvailable= false;
  // newWSinfo: WorkspaceObject;
  databaseIds: string[] = [];
  // selectedDBList: ConfiguredDB[] = [];
  errorDBselect = false;
  DBtable: any;
  selectedDBtable: any;
  
  constructor(
    private router: Router,
    private userinfoService: UserinfoService,
    private userWorkspaceService: UserWorkspaceService
  ) { }

  ngOnInit() {
    this.getAllDBServer();
    this.documentReadyFn();
  }

  selectDBServer(servername) {
      this.supportedDBId = servername.id;
      this.selectedDBServerName = servername.name;
      this.port = servername.defaultPort;
     
  }
  

  getAllDBServer() {
    this.userWorkspaceService.getAllSupportedDBServer().subscribe( res => {
      if (res) {
        this.dbServerList = res.applications.allowedDBs;
        console.log(res.applications.allowedDBs, 'port');
      }
    }); 
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
    this.wsName = this.profileName;

    if (!this.wsName) {
      this.wsNameEmpty = true;
      document.getElementById('wsName').focus();
      e.stopPropagation();
    } else {
      if (document.querySelector('.second-last').classList.contains('active') ) {
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
    this.dbParam.port = undefined;
    this.dbParam.host = undefined;
    this.dbParam.databaseName = undefined;
    this.dbParam.schemaName = undefined;

  }

  postCreation() {
    const thisComponent = this; // this is component's 'this'
    thisComponent.addClass('prev-btn', 'hide');
    thisComponent.addClass('create-btn', 'hide');
    thisComponent.removeClass('ok-btn', 'hide');
    document.getElementById('next-slide').click();
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
    // this.dbParam.dbProfileName = this.dbProfileName;
    this.dbParam.userName = this.userName;
    this.dbParam.password = this.password;
    this.dbParam.port = this.port;
    this.dbParam.host = this.host;
    this.dbParam.databaseName = this.databaseName;
    this.dbParam.schemaName = this.schemaName;
    this.dbParam.supportedDBId = this.supportedDBId;
    this.dbParam.authType = this.authType;
    this.dbParam.profileName = this.profileName
    this.addClass('progress-bar', 'width-100-pc');
    this.userWorkspaceService.createNewDBConfig(this.dbParam).subscribe( res => {
      if (res) {
        this.newWSinfo = res
        console.log('latest testing ', res)
        document.getElementById("populate-db-list").click();
        this.postCreation();
      }
    });
    // window.location.reload();
    // this.router.navigate(['/workspace/database-list']);
  }

}
