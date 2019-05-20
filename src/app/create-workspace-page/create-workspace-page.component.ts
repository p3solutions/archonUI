import { Component, OnInit, QueryList, ViewChildren, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper, MatTableDataSource, MatPaginator, MatSort, MatStepHeader } from '@angular/material';
import { ConfiguredDB } from '../workspace-objects';
import { UserWorkspaceService } from '../user-workspace.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-workspace-page',
  templateUrl: './create-workspace-page.component.html',
  styleUrls: ['./create-workspace-page.component.css']
})
export class CreateWorkspacePageComponent implements OnInit {
  firstFormGroup: FormGroup;
  comment = '';
  @ViewChild('stepper') stepper: MatStepper;
  displayedColumns: string[] = ['select', 'databaseProfileName', 'databaseName', 'owner', 'createdDate'];
  dataSource: MatTableDataSource<ConfiguredDB>;
  configDBList: ConfiguredDB[] = [];
  value: any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  databaseName = '';
  creationDate = '';
  databaseIds: string[] = [];
  private location = '';
  errorMessage = '';
  showWorkDuplicateMsg = '';
  successWorkspaceMessage = '';
  selectDatabaseMessage = '';
  enableStepTwoBtn = true;
  workspaceInProgress = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _formBuilder: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute,
    private userWorkspaceService: UserWorkspaceService) {
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.value = document.querySelectorAll('.mat-horizontal-stepper-header');
    this.value[0].querySelector('.mat-step-icon-content').innerHTML = '<i class="material-icons">library_books</i>';
    this.value[1].querySelector('.mat-step-icon-content').innerHTML = '<i class="material-icons">assignment_turned_in</i>';
    this.value[2].querySelector('.mat-step-icon-content').innerHTML = '<i class="material-icons">playlist_add_check</i>';
    this.value[2].children[1].classList.add('unfinished-step');
    this.value[1].children[1].classList.add('unfinished-step');
  }
  ngOnInit() {
    this.location = this.activatedRoute.snapshot.queryParamMap.get('r');
    this.firstFormGroup = this._formBuilder.group({
      workspaceName: ['', Validators.required],
      owner: [{ value: this.getOwnerName(), disabled: true }, Validators.required],
      creationDate: [{ value: this.getTodayDate(), disabled: true }, Validators.required],
      description: ['', Validators.required]
    });
    this.userWorkspaceService.getSupportedDBList()
      .subscribe(res => {
        if (res && res.length > 0) {
          this.configDBList = res;
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  gotoDatabaseSelection(stepper: MatStepper) {
    const steps: MatStepHeader[] = stepper._stepHeader.toArray();
    if (this.firstFormGroup.valid) {
      setTimeout(() => {
        const a = document.getElementsByClassName('mat-horizontal-stepper-header');
        a[0].classList.add('mat-psedu');
        a[1].classList.add('mat-k-psedu');
        const b = document.querySelectorAll('.mat-horizontal-stepper-header-container');
        b[0].children[1].classList.add('mat-horizental-line');
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

  gotoWorkspaceDetails(stepper: MatStepper) {
    const steps: MatStepHeader[] = stepper._stepHeader.toArray();
    setTimeout(() => {
      const a = document.getElementsByClassName('mat-horizontal-stepper-header');
      a[0].classList.remove('mat-psedu');
      a[1].classList.remove('mat-k-psedu');
      const b = document.querySelectorAll('.mat-horizontal-stepper-header-container');
      b[0].children[1].classList.remove('mat-horizental-line');
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
  gotoWorkspaceReview(stepper: MatStepper) {
    const steps: MatStepHeader[] = stepper._stepHeader.toArray();
    if (this.configDBList.filter(a => a.isChecked === true).length !== 0) {
      setTimeout(() => {
        const a = document.getElementsByClassName('mat-horizontal-stepper-header');
        a[1].classList.add('mat-auth-psedu');
        a[2].classList.add('mat-review-psedu');
        const b = document.querySelectorAll('.mat-horizontal-stepper-header-container');
        b[0].children[3].classList.add('mat-horizental-line');
        if (steps[1].state === 'edit') {
          this.value[1].children[1].classList.add('finished-step');
        }
        if (steps[0].state === 'edit') {
          this.value[0].children[1].classList.add('finished-step');
        }
        this.value[2].children[1].classList.add('active-step');
      }, 300);
      this.stepper.selectedIndex = 2;
    } else {
      document.getElementById('select-db-btn').click();
      this.errorMessage = 'Please select a database.';
    }
  }

  createWorkspace(stepper: MatStepper) {
    this.databaseIds = [];
    this.showWorkDuplicateMsg = '';
    const selectedDBId = this.configDBList.filter(a => a.isChecked === true)[0].id;
    this.databaseIds.push(selectedDBId);
    this.workspaceInProgress = true;
    const param: any = {
      'workspaceName': this.firstFormGroup.get('workspaceName').value,
      'databaseIds': this.databaseIds,
      'description': this.firstFormGroup.get('description').value,
      'comment': this.comment
    };
    this.userWorkspaceService.createNewWorkspace(param).subscribe(res => {
      this.workspaceInProgress = false;
      if (res) {
        document.getElementById('success-popup-btn').click();
        this.successWorkspaceMessage = 'Workspace Created Successfully.';
      } else {
        document.getElementById('select-db-btn').click();
        this.errorMessage = 'This Workspace Name already is in use.';
      }
    });
  }

  selectDatabase(id, event) {
    this.configDBList.forEach(a => a.isChecked = false);
    if (event.checked) {
      this.closeErrorMsg();
      const temp = this.configDBList.filter(a => a.id === id)[0];
      temp.isChecked = true;
      this.databaseName = temp.profileName;
    }
    const selectedDBId = this.configDBList.filter(a => a.isChecked === true)[0].id;
  }

  getOwnerName(): string {
    const accessToken = localStorage.getItem('accessToken');
    const token_data = this.jwtHelper.decodeToken(accessToken);
    return token_data.user.firstName + ' ' + token_data.user.lastName;;
  }

  getTodayDate(): string {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const todayDate = mm + '/' + dd + '/' + yyyy;
    this.creationDate = todayDate;
    return todayDate;
  }

  closeErrorMsg() {
    this.errorMessage = '';
  }

  navigateToPrevious() {
    if (this.location.trim().toLowerCase() === 'home') {
      this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
    } else if (this.location.trim().toLowerCase() === 'workspace') {
      this.router.navigate(['management-landing-page/workspace-list']);
    }
  }
}