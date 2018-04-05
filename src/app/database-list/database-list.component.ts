import { Component, OnInit } from '@angular/core';
import { ConfiguredDB } from '../workspace-objects';
import { DatabaseListService } from './database-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-database-list',
  templateUrl: './database-list.component.html',
  styleUrls: ['./database-list.component.css']
})
export class DatabaseListComponent implements OnInit {
  isProgress: boolean;
  configDBListInfo: any;
  constructor(
    private configDBListService: DatabaseListService,
    private router: Router) { }

  ngOnInit() {
    this.getConfigDBList();
    this.isProgress = true;
  }
  getConfigDBList() {
    this.configDBListService.getListOfConfigDatabases().subscribe(result => {
      this.configDBListInfo = result;
      console.log(this.configDBListInfo);
      this.isProgress = false;
    });
  }
  gotoManagementPanel() {
    this.router.navigate(['workspace/management-panel']);
  }
}
