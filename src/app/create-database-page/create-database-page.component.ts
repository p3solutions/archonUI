import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { UserWorkspaceService } from '../user-workspace.service';

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
  constructor(private _formBuilder: FormBuilder, private userWorkspaceService: UserWorkspaceService) { }

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
    console.log(this.databaseConnectionForm.value);
  }

  gotoTestAndCreate(stepper: MatStepper) {
    this.stepper.selectedIndex = 2;
    console.log(this.databaseConnectionForm.value);
  }
  gotoConnectionDetails(stepper: MatStepper) {
    this.stepper.selectedIndex = 0;
    console.log(this.databaseConnectionForm.value);
  }

  testConnection() {
    this.inProgress = true;
    this.userWorkspaceService.checkDBConnection(this.databaseConnectionForm.value, this.userServerForm.value).subscribe((res: any) => {
      if (res) {
        this.inProgress = false;
        this.dbTestConnectionErrorMsg = res.connection.errorMessage;
        this.dbTestConnectionSuccessMsg = res.connection.message;
        if (res.connection.isConnected) {
          this.disableCreateBtn = false;
        }
      } else {
        this.inProgress = false;
        this.dbTestConnectionSuccessMsg = '';
        this.dbTestConnectionErrorMsg = 'Failed! Try again with correct DB configuration.';
      }
    });
  }
  createDatatbase(stepper: MatStepper) {
    this.stepper.selectedIndex = 0;
    console.log(this.databaseConnectionForm.value);
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

  createDBConfig() {
    this.dbinProgress = true;
    this.userWorkspaceService.checkDBConnection(this.databaseConnectionForm.value, this.userServerForm.value).subscribe((res: any) => {
      if (res) {
        if (res.connection.isConnected) {
          this.dbinProgress = true;
          this.disableCreateBtn = true;
          this.createNewdb();
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
    this.userWorkspaceService.createNewDBConfig(this.databaseConnectionForm.value, this.userServerForm.value).subscribe(res => {
      if (res) {

      }
    });
  }
}
