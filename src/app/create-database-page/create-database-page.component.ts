import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepper, MatStepHeader } from '@angular/material';
import { UserWorkspaceService } from '../user-workspace.service';
import { Router } from '@angular/router';
import { DatabaseListService } from '../database-list/database-list.service';
import { ConfiguredDB } from '../workspace-objects';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

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
  errorMessage = '';
  constructor(private _formBuilder: FormBuilder, private userWorkspaceService: UserWorkspaceService
    , private router: Router, private databaseListService: DatabaseListService) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.value = document.querySelectorAll('.mat-horizontal-stepper-header');
    this.value[0].querySelector('.mat-step-icon-content').innerHTML = '<i class="material-icons">settings_input_component</i>';
    this.value[1].querySelector('.mat-step-icon-content').innerHTML = '<i class="material-icons">assignment_turned_in</i>';
    this.value[2].querySelector('.mat-step-icon-content').innerHTML = '<i class="material-icons">playlist_add_check</i>';
    this.value[2].children[1].classList.add('unfinished-step');
    this.value[1].children[1].classList.add('unfinished-step');
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
    const steps: MatStepHeader[] = stepper._stepHeader.toArray();
    if (this.databaseConnectionForm.valid) {
      setTimeout(() => {
        const a = document.getElementsByClassName('mat-horizontal-stepper-header');
        a[0].classList.add('mat-psedu');
        a[1].classList.add('mat-k-psedu');
        const b = document.querySelectorAll('.mat-horizontal-stepper-header-container');
        b[0].children[1].classList.add('mat-horizental-line');
        document.getElementById('remove-square-hover').click();
        const a1 = document.getElementsByClassName('mat-horizontal-stepper-header');
        if (a1[1].classList.contains('mat-auth-psedu')) {
          a1[1].classList.remove('mat-auth-psedu');
          a1[2].classList.remove('mat-review-psedu');
          const b1 = document.querySelectorAll('.mat-horizontal-stepper-header-container');
          b1[0].children[3].classList.remove('mat-horizental-line');
        }
        if (steps[0].state === 'edit') {
          this.value[0].children[1].classList.add('finished-step');
        }
        if (steps[2].state === 'edit') {
          this.value[2].children[1].classList.add('finished-step');
        }
        this.value[1].children[1].classList.add('active-step');
      }, 300);
    }
    this.stepper.selectedIndex = 1;
  }

  gotoTestAndCreate(stepper: MatStepper) {
    const steps: MatStepHeader[] = stepper._stepHeader.toArray();
    if (this.userServerForm.valid) {
      setTimeout(() => {
        const a = document.getElementsByClassName('mat-horizontal-stepper-header');
        a[1].classList.add('mat-auth-psedu');
        a[2].classList.add('mat-review-psedu');
        const b = document.querySelectorAll('.mat-horizontal-stepper-header-container');
        b[0].children[3].classList.add('mat-horizental-line');
        document.getElementById('remove-square-hover').click();
        if (steps[1].state === 'edit') {
          this.value[1].children[1].classList.add('finished-step');
        }
        if (steps[0].state === 'edit') {
          this.value[0].children[1].classList.add('finished-step');
        }
        // this.value[1].children[1].classList.add('finished-step');
        this.value[2].children[1].classList.add('active-step');
      }, 300);
      if (steps[2].state !== 'edit') {
        this.checkForDuplicate();
      }
    }
    this.stepper.selectedIndex = 2;
  }
  gotoConnectionDetails(stepper: MatStepper) {
    const steps: MatStepHeader[] = stepper._stepHeader.toArray();
    setTimeout(() => {
      const a = document.getElementsByClassName('mat-horizontal-stepper-header');
      a[0].classList.remove('mat-psedu');
      a[1].classList.remove('mat-k-psedu');
      const b = document.querySelectorAll('.mat-horizontal-stepper-header-container');
      b[0].children[1].classList.remove('mat-horizental-line');
      document.getElementById('remove-square-hover').click();
      this.value[0].children[1].classList.add('active-step');
      if (steps[1].state === 'number') {
        if (this.value[1].children[1].classList.contains('active-step')) {
          this.value[1].children[1].classList.remove('active-step');
        }
        this.value[1].children[1].classList.add('unfinished-step');
      }
      if (steps[1].state === 'edit') {
        this.value[1].children[1].classList.add('finished-step');
      }
      if (steps[2].state === 'edit') {
        this.value[2].children[1].classList.add('finished-step');
      }
    }, 300);
    this.stepper.selectedIndex = 0;
  }

  testConnection() {
    this.inProgress = true;
    this.userWorkspaceService.checkDBConnection(this.databaseConnectionForm.value, this.userServerForm.value).subscribe((res: any) => {
      if (res) {
        this.inProgress = false;
        this.dbTestConnectionErrorMsg = '';
        this.errorMessage = res.connection.message;
        document.getElementById('select-db-btn').click();
        if (res.connection.isConnected) {
          this.disableCreateBtn = false;
        }
      } else {
        this.inProgress = false;
        this.disableCreateBtn = true;
        this.dbTestConnectionSuccessMsg = '';
        this.errorMessage = 'Failed! Try again with correct DB configuration.';
        document.getElementById('select-db-btn').click();
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
          this.errorMessage = 'Unable to Create Database. Please Test Connection.';
          document.getElementById('select-db-btn').click();
        }
      } else {
        this.dbinProgress = false;
        this.disableCreateBtn = false;
        this.errorMessage = 'Unable to Create Database. Please Test Connection.';
        document.getElementById('select-db-btn').click();

      }
    });
  }

  createNewdb() {
    this.userWorkspaceService.createNewDBConfig(this.databaseConnectionForm.value, this.userServerForm.value).subscribe(res => {
      if (res) {
        document.getElementById('success-popup-btn').click();
        this.successDatabaseMessage = 'Database profile created successfully and started pre-analysis jobs.';
      }
    });
  }

  navigateToPrevious() {
    this.router.navigate(['/management-landing-page/database-list']);
  }

  checkForDuplicate() {
    this.databaseListService.getListOfConfigDatabases().subscribe(response => {
      if (response) {
        for (const db of response) {
          if ((db.host === this.databaseConnectionForm.get('host').value) && (db.port ===
            this.databaseConnectionForm.get('port').value) && (db.databaseName === this.databaseConnectionForm.get('databaseName').value)) {
            this.errorMessage = 'Same database Connection exists with different profile name.';
            document.getElementById('select-db-btn').click();
            break;
          }
        }
      }
    });
  }
}
