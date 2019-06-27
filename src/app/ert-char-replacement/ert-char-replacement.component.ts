import { Component, OnInit, ViewChild } from '@angular/core';
import { Charreplacement } from './charreplacement';
import { MatTableDataSource, MatPaginator, MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSort } from '@angular/material';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { Router } from '@angular/router';
import { CharReplacementService } from './char-replacement.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ert-char-replacement',
  templateUrl: './ert-char-replacement.component.html',
  styleUrls: ['./ert-char-replacement.component.css']
})
export class ErtCharReplacementComponent implements OnInit {
  charReplaceInfo = new Charreplacement();
  charReplaceList: Charreplacement[] = [];
  displayedColumns: string[] = ['codePoint', 'hexCode', 'charRepresentation', 'replacementChar', 'updatedAt', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource<Charreplacement>(this.charReplaceList);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  workspaceId = '';
  successMsg = '';
  editCharId = '';
  isDisabled: boolean;
  deletedId = '';
  constructor(private charReplacementService: CharReplacementService,
    private workspaceHeaderService: WorkspaceHeaderService, private router: Router) { }

  ngOnInit() {
    this.workspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.workspaceHeaderService.updateCheckActiveTab('Character Replacement');
    this.getAllCharRecords();
  }

  getAllCharRecords() {
    this.charReplacementService.getAllCharRecord(this.workspaceId).subscribe(result => {
      this.charReplaceList = result;
      this.dataSource.data = this.charReplaceList;
    });
  }
  saveCharReplacement(form: NgForm) {
    this.isDisabled = false;
    if (this.editCharId) {
      this.updateCharRecord();
    } else {
      this.addCharReplacement();
    }
    this.editCharId = '';
    form.form.reset();
    setTimeout(() => {
      this.getAllCharRecords();
    }, 2000);
  }

  addCharReplacement() {
    this.charReplacementService.saveCharRecord(this.workspaceId, this.charReplaceInfo).subscribe(result => {
      if (result.httpStatus === 200) {
        this.successMsg = 'Successfully added the record';
        document.getElementById('success-popup-btn').click();
      } else {
        this.successMsg = 'Already an entry exists for given code point';
        document.getElementById('error-popup-btn').click();
      }
    }, (err: HttpErrorResponse) => {
      if (err.error) {
        document.getElementById('error-popup-btn').click();
        this.successMsg = err.error.message;
      }
    });
  }

  updateCharRecord() {
    this.charReplacementService.editCharRecord(this.charReplaceInfo.id, this.charReplaceInfo).subscribe(result => {
      if (result.httpStatus === 200) {
        this.successMsg = 'Successfully updated the record';
        document.getElementById('success-popup-btn').click();
      } else {
        this.successMsg = 'Already an entry exists for given code point';
        document.getElementById('error-popup-btn').click();
      }
    }, (err: HttpErrorResponse) => {
      if (err.error) {
        document.getElementById('error-popup-btn').click();
        this.successMsg = err.error.message;
      }
    });
  }

  editCharRecord(id: string) {
    this.isDisabled = true;
    this.editCharId = id;
    const temp = this.charReplaceList.find(a => a.id === id);
    this.charReplaceInfo = Object.assign({}, temp);
  }

  refreshCharRecord(form: NgForm) {
    this.isDisabled = false;
    form.form.reset();
  }

  deleteCharRecord() {
    this.charReplacementService.deleteCharRecord(this.deletedId).subscribe(result => {
      this.successMsg = result.data;
      this.dataSource.data = [];
      this.getAllCharRecords();
    }, (err: HttpErrorResponse) => {
      if (err.error) {
        document.getElementById('error-popup-btn').click();
        this.successMsg = err.error.message;
      }
    });
  }

  confirmDeletePopup(id: string) {
    document.getElementById('delete-popup-btn').click();
    this.deletedId = id;
  }

  checkForNumber() {
    if (isNaN(this.charReplaceInfo.codePoint)) {
      this.charReplaceInfo.codePoint = null;
    }
  }

  createReplacementChar() {
    if (String.fromCharCode(this.charReplaceInfo.codePoint).trim() === '') {
      this.successMsg = 'Invalid Code Point';
      document.getElementById('error-popup-btn').click();
      this.charReplaceInfo = new Charreplacement();
    } else {
      this.charReplaceInfo.replacementChar = this.createHexCode();
    }
  }

  createHexCode() {
    let hexCode = '0x';
    const hex = Number(this.charReplaceInfo.codePoint).toString(16).toUpperCase();
    switch (hex.length) {
      case 1:
        hexCode = hexCode + '000' + hex;
        break;
      case 2:
        hexCode = hexCode + '00' + hex;
        break;
      case 3:
        hexCode = hexCode + '0' + hex;
        break;
      default:
        hexCode = hexCode + hex;
        break;
    }
    return hexCode;
  }
  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }
}
