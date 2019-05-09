import { Component, OnInit, QueryList, ViewChildren, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
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
  }
  ngOnInit() {
    this.location = this.activatedRoute.snapshot.queryParamMap.get('r');
    this.firstFormGroup = this._formBuilder.group({
      workspaceName: ['', Validators.required],
      owner: [{ value: this.getOwnerName(), disabled: true }, Validators.required],
      creationDate: [{ value: this.getTodayDate(), disabled: true }, Validators.required],
      description: [''],
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

  stepClick($event) {
    console.log($event);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  gotoDatabaseSelection(stepper: MatStepper) {
    this.stepper.selectedIndex = 1;
    console.log(this.firstFormGroup.value);
  }

  gotoWorkspaceDetails(stepper: MatStepper) {
    this.stepper.selectedIndex = 0;
  }
  gotoWorkspaceReview(stepper: MatStepper) {
    if (this.configDBList.filter(a => a.isChecked === true).length !== 0) {
      this.stepper.selectedIndex = 2;
    } else {
      this.errorMessage = 'Please Select a Database.';
    }
  }

  createWorkspace(stepper: MatStepper) {
    this.showWorkDuplicateMsg = '';
    const selectedDBId = this.configDBList.filter(a => a.isChecked === true)[0].id;
    this.databaseIds.push(selectedDBId);
    const param: any = {
      'workspaceName': this.firstFormGroup.get('workspaceName').value,
      'databaseIds': this.databaseIds
    };
    this.userWorkspaceService.createNewWorkspace(param).subscribe(res => {
      if (res) {
        document.getElementById('success-popup-btn').click();
        this.successWorkspaceMessage = 'Workspace Created Successfully.';
      } else {
        this.showWorkDuplicateMsg = 'This Workspace Name already is in use.';
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