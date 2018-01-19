import { Component, OnInit, Input } from '@angular/core';
import {Router} from  '@angular/router';
@Component({
  selector: 'app-workspace-services',
  templateUrl: './workspace-services.component.html',
  styleUrls: ['./workspace-services.component.css']
})
export class WorkspaceServicesComponent implements OnInit {
  constructor(private router : Router) { }

  ngOnInit() {

  }

}
