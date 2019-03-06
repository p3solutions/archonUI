import { Component, OnInit, ViewChild } from '@angular/core';
import { Charreplacement } from './charreplacement';
import { MatTableDataSource, MatPaginator, MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSort } from '@angular/material';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { Router } from '@angular/router';
import { CharReplacementService } from './char-replacement.service';

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
  constructor(private charReplacementService: CharReplacementService,
    private workspaceHeaderService: WorkspaceHeaderService, private router: Router) { }

  ngOnInit() {
    this.workspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllCharRecords();
  }

  getAllCharRecords() {
    this.charReplacementService.getAllCharRecord(this.workspaceId).subscribe(result => {
      this.charReplaceList = result;
      this.dataSource.data = this.charReplaceList;
    });
  }
  saveCharReplacement() {
    if (this.editCharId) {
      this.updateCharRecord();
    } else {
      this.addCharReplacement();
    }
    this.editCharId = '';
    this.charReplaceInfo = new Charreplacement();
    setTimeout(() => {
      this.getAllCharRecords();
    }, 2000);
  }

  addCharReplacement() {
    this.charReplacementService.saveCharRecord(this.workspaceId, this.charReplaceInfo).subscribe(result => {
      if (result.httpStatus === 200) {
        this.successMsg = result.data;
      } else {
        this.successMsg = 'Failed';
      }
      document.getElementById('openSuccessModelBtn').click();
    });
  }

  updateCharRecord() {
    this.charReplacementService.editCharRecord(this.charReplaceInfo.id, this.charReplaceInfo).subscribe(result => {
      if (result.httpStatus === 200) {
        this.successMsg = result.data;
      } else {
        this.successMsg = 'Failed';
      }
      document.getElementById('openSuccessModelBtn').click();
    });
  }

  editCharRecord(id: string) {
    this.editCharId = id;
    const temp = this.charReplaceList.find(a => a.id === id);
    this.charReplaceInfo = Object.assign({}, temp);
  }

  refreshCharRecord() {
    this.charReplaceInfo = new Charreplacement();
  }

  deleteCharRecord(id: string) {
    this.charReplacementService.deleteCharRecord(id).subscribe(result => {
      this.successMsg = result.data;
      document.getElementById('openSuccessModelBtn').click();
      this.dataSource.data = [];
      this.getAllCharRecords();
    });
  }

  checkForNumber() {
    if (isNaN(this.charReplaceInfo.codePoint)) {
      this.charReplaceInfo.codePoint = null;
    }
  }

  createReplacementChar() {
    if (String.fromCharCode(this.charReplaceInfo.codePoint).trim() === '') {
      this.successMsg = 'Invalid Code Point';
      document.getElementById('openSuccessModelBtn').click();
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
