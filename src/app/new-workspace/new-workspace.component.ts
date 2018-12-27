import { Component, OnInit } from '@angular/core';
import { UserObject, AnyObject, ConfiguredDB, WorkspaceObject } from '../workspace-objects';
import { UserinfoService } from '../userinfo.service';
import { UserWorkspaceService } from '../user-workspace.service';
import { CommonUtilityService } from '../common-utility.service';
@Component({
  selector: 'app-new-workspace',
  templateUrl: './new-workspace.component.html',
  styleUrls: ['./new-workspace.component.css']
})
export class NewWorkspaceComponent implements OnInit {
  wsName: string;
  wsDesc: string;
  loggedInUser: UserObject;
  today = new Date();
  wsParam: AnyObject = {};
  supportedDBs: ConfiguredDB[] = [];
  wsNameEmpty = false;
  isDBAvailable = false;
  newWSinfo: WorkspaceObject;
  databaseIds: string[] = [];
  selectedDBList: ConfiguredDB[] = [];
  errorDBselect = false;
  DBtable: any;
  selectedDBtable: any;

  constructor(
    private userinfoService: UserinfoService,
    private userWorkspaceService: UserWorkspaceService,
    private commonUtilityService: CommonUtilityService
  ) { }

  ngOnInit() {
    this.documentReadyFn();
  }

  documentReadyFn() {
    this.loggedInUser = this.userinfoService.getLoggedInUserFromAccessToken();
    document.getElementById('openCreateWSmodal').click();
    this.getSupportedDBs();
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
        if (this.databaseIds.length > 0) { // selected at least one DB
          // restricting to select one, temporarily as per Backend team
           if (this.databaseIds.length > 1) {
            alert('Select only 1 DB. Multiple selection is prohibited temporarily!');
            return false;
          }
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
  createWS() {
    this.wsParam.workspaceName = this.wsName;
    this.wsParam.databaseIds = this.databaseIds;
    this.addClass('progress-bar', 'width-100-pc');
    this.userWorkspaceService.createNewWorkspace(this.wsParam).subscribe( res => {
      if (res) {
        this.newWSinfo = res;
        this.postCreation();
        // after getting ok response reloading the workspace list
        document.getElementById('reload-ws-list').click();
      }
    });
  }

  getSupportedDBs() {
    const thisComponent = this;
    this.userWorkspaceService.getSupportedDBList()
    .subscribe( res => {
      if (res && res.length > 0) {
        res.forEach(element => {
          element.createdDate = thisComponent.commonUtilityService.getDisplayTime(element.createdAt * 1000);
         // element.createdDate = new Date(element.createdAt * 1000).toDateString();
          this.supportedDBs.push(element);
        });
        this.isDBAvailable = true;
        this.generateDBtable({ data: this.supportedDBs});
      }
    });
  }
  generateDBtable(xData) {
    const thisComponent = this;
    if (this.DBtable) {
      this.DBtable.destroy();
    }
    this.DBtable = $('#db-list-table').DataTable({
      'lengthMenu': [[5, 10, 25, 50, -1], [5, 10, 25, 50, 'All']],
      'ajax': function (data, callback, settings) { callback(xData); },
      'columns': [
        {
          'className': 'text-center',
          'orderable': false,
          'data': null,
          'defaultContent': `<div data-tooltip='Select' class='select-db'>
                              <input type='checkbox' class='scaleBox selected-db' />
                            </div>`,
          'title': ''
        },
        { 'data': 'profileName' },
        { 'data': 'databaseName' },
        { 'data': 'owner.name' },
        { 'data': 'createdDate' },
        // {
        //   'className': 'fa fa-plus-circle fa-lg archon-icon disp-bl text-center',
        //   'orderable': false,
        //   'data': null,
        //   'defaultContent': '',
        //   'title': ''
        // }
      ],
      'order': [[1, 'asc']]
    });
    this.bindCHeckboxClick();
    $('.dataTables_paginate,.paging_simple_numbers,.dataTables_length').off('click').on('click', function() {
      thisComponent.bindCHeckboxClick();
    });
    $('.dataTables_filter').off('keyup').on('keyup', function() {
      thisComponent.bindCHeckboxClick();
    });
  }
  bindCHeckboxClick() {
    const thisComponent = this; // this is component's 'this'
    $('input[type=checkbox].selected-db').off('change').on('change', function () {
      thisComponent.refreshSelectedDBs(this);
    });
  }
  refreshSelectedDBs(checkbox: HTMLElement) {
    const _row = $(checkbox).closest('tr');
    // const _row = $(checkbox).prop('checked') ? $(checkbox).closest('tr') : null;
    const selDBdata = this.DBtable.row(_row).data();
    // console.log(selDBdata);
    const id = selDBdata.id;
    if ($(checkbox).is(':checked')) {
      this.databaseIds.push(id);
      this.supportedDBs.forEach(db => {
        if (id === db.id) {
          this.selectedDBList.push(db);
        }
      });
    } else {
      this.databaseIds = this.removeElementByValue(this.databaseIds, id);
      this.selectedDBList = this.removeObjByValue(this.selectedDBList, 'id', id);
    }
    if (this.databaseIds.length === 0 ) {
      this.errorDBselect = true;
    } else {
      this.errorDBselect = false;
    }
    // console.log('selected DB ids', this.databaseIds, this.selectedDBList);
  }
  removeElementByValue(array, value) {
    return array.filter(function (elem, _index) {
      return value !== elem;
    });
  }
  removeObjByValue(array, key, value) {
    return array.filter(function (elem, _index) {
      return value !== elem[key];
    });
  }

  postCreation() {
    const thisComponent = this; // this is component's 'this'
    thisComponent.addClass('prev-btn', 'hide');
    thisComponent.addClass('create-btn', 'hide');
    thisComponent.removeClass('ok-btn', 'hide');
    document.getElementById('next-slide').click();
    if (this.selectedDBtable) {
      this.selectedDBtable.destroy();
    }
    this.selectedDBtable = $('#selected-db-list-table').DataTable({
      // 'searching': false,
      'lengthMenu': [[5, 10, 25, 50, -1], [5, 10, 25, 50, 'All']],
      'ajax': function (data, callback, settings) { callback({data: thisComponent.selectedDBList}); },
      'columns': [
        { 'data': 'databaseName' },
        { 'data': 'owner.name' },
        {
          'className': '',
          'orderable': false,
          'data': null,
          'defaultContent': 'Pending Approval',
          'title': 'Status'
        }
      ],
      'order': [[0, 'asc']]
    });
  }
  resetCarousel() {
    this.addClass('ok-btn', 'hide');
    document.getElementById('next-slide').click();
    this.removeClass('next-btn', 'hide');
    this.removeClass('cancel-btn', 'hide');
    this.wsName = undefined;
    this.wsNameEmpty = false;
    this.wsDesc = undefined;
    this.newWSinfo = null;
  }
}
