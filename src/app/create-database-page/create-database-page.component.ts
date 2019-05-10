import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { UserWorkspaceService } from '../user-workspace.service';
import { Router } from '@angular/router';
import { DatabaseListService } from '../database-list/database-list.service';
import { ConfiguredDB } from '../workspace-objects';

@Component({
  selector: 'app-create-database-page',
  templateUrl: './create-database-page.component.html',
  styleUrls: ['./create-database-page.component.css']
})
export class CreateDatabasePageComponent implements OnInit {
  databaseConnectionForm: FormGroup;
  userServerForm: FormGroup;
  @ViewChild('stepper') stepper: MatStepper;
  dbServerList = [];
  authTypeList = ['JDBC'];
  databaseServerName = '';
  value: any;
  inProgress = false;
  dbTestConnectionSuccessMsg = '';
  dbTestConnectionErrorMsg = '';
  disableCreateBtn = true;
  dbinProgress = false;
  successDatabaseMessage = '';
  duplicateDatabaseMessage = '';
  databaseList: ConfiguredDB[] = [];
  constructor(private _formBuilder: FormBuilder, private userWorkspaceService: UserWorkspaceService
    , private router: Router, private databaseListService: DatabaseListService) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.value = document.querySelectorAll('.mat-horizontal-stepper-header');
    this.value[0].querySelector('.mat-step-icon-content').innerHTML = '<i class="material-icons">settings_input_component</i>';
    this.value[1].querySelector('.mat-step-icon-content').innerHTML = '<i class="material-icons">assignment_turned_in</i>';
    this.value[2].querySelector('.mat-step-icon-content').innerHTML = '<i class="material-icons">playlist_add_check</i>';
  }

  ngOnInit() {
    this.getAllDBServer();
    this.initConnectionDetails();
    this.initUserServerDetails();
  }

  initConnectionDetails() {
    this.databaseConnectionForm = this._formBuilder.group({
      profileName: ['', Validators.required],
      supportedDBId: ['', Validators.required],
      authType: [this.authTypeList[0], Validators.required],
      host: ['', Validators.required],
      port: ['', Validators.required],
      databaseName: ['', Validators.required],
      schemaName: ['', Validators.required]
    });
  }

  initUserServerDetails() {
    this.userServerForm = this._formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  getAllDBServer() {
    this.userWorkspaceService.getAllSupportedDBServer().subscribe(res => {
      if (res) {
        this.dbServerList = res.applications.allowedDBs;
        this.databaseConnectionForm.controls['supportedDBId'].setValue(this.dbServerList[0].id);
        this.databaseConnectionForm.controls['port'].setValue(this.dbServerList[0].defaultPort);
        this.databaseServerName = this.dbServerList[0].name;
      }
    });
  }

  gotoAuthentication(stepper: MatStepper) {
    this.stepper.selectedIndex = 1;
  }

  gotoTestAndCreate(stepper: MatStepper) {
    this.checkForDuplicate();
    this.stepper.selectedIndex = 2;
  }
  gotoConnectionDetails(stepper: MatStepper) {
    this.stepper.selectedIndex = 0;
  }

  testConnection() {
    this.inProgress = true;
    this.userWorkspaceService.checkDBConnection(this.databaseConnectionForm.value, this.userServerForm.value).subscribe((res: any) => {
      if (res) {
        this.inProgress = false;
        this.dbTestConnectionErrorMsg = '';
        this.dbTestConnectionSuccessMsg = res.connection.message;
        if (res.connection.isConnected) {
          this.disableCreateBtn = false;
        }
      } else {
        this.inProgress = false;
        this.disableCreateBtn = true;
        this.dbTestConnectionSuccessMsg = '';
        this.dbTestConnectionErrorMsg = 'Failed! Try again with correct DB configuration.';
      }
    });
  }

  setPortName(id: string) {
    const temp = this.dbServerList.filter(a => a.id === id)[0];
    this.databaseConnectionForm.controls['port'].setValue(temp.defaultPort);
    this.databaseServerName = temp.name;
  }
  closeErrorMsg() {
    this.dbTestConnectionSuccessMsg = '';
    this.dbTestConnectionErrorMsg = '';
  }

  createDatatbase() {
    this.dbinProgress = true;
    this.userWorkspaceService.checkDBConnection(this.databaseConnectionForm.value, this.userServerForm.value).subscribe((res: any) => {
      if (res) {
        if (res.connection.isConnected) {
          this.dbinProgress = true;
          this.disableCreateBtn = true;
          this.createNewdb();
        } else {
          this.disableCreateBtn = false;
          this.dbinProgress = false;
          this.dbTestConnectionErrorMsg = 'Unable to Create Database. Please Test Connection.';
        }
      } else {
        this.dbinProgress = false;
        this.disableCreateBtn = false;
        this.dbTestConnectionErrorMsg = 'Unable to Create Database. Please Test Connection.';
      }
    });
  }

  createNewdb() {
    this.userWorkspaceService.createNewDBConfig(this.databaseConnectionForm.value, this.userServerForm.value).subscribe(res => {
      if (res) {
        console.log(res);
        document.getElementById('success-popup-btn').click();
        this.successDatabaseMessage = 'Database Created Successfully';
      }
    });
  }

  navigateToPrevious() {
    this.router.navigate(['/management-landing-page/database-list']);
  }

  checkForDuplicate() {
    this.databaseListService.getListOfConfigDatabases().subscribe(response => {
      if (response) {
        console.log(response);
        for (const db of response) {
          if ((db.host === this.databaseConnectionForm.get('host').value) && (db.port ===
            this.databaseConnectionForm.get('port').value) && (db.databaseName === this.databaseConnectionForm.get('databaseName').value)) {
              this.duplicateDatabaseMessage = 'Same database Connection exists with different profile name.';
              break;
          }
        }
      }
    });
  }
}
