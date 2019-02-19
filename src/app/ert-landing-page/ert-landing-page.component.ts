import { Component, OnInit } from '@angular/core';
import { ErtService } from './ert.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { UserinfoService } from '../userinfo.service';

@Component({
  selector: 'app-ert-landing-page',
  templateUrl: './ert-landing-page.component.html',
  styleUrls: ['./ert-landing-page.component.css']
})
export class ErtLandingPageComponent implements OnInit {

  constructor(private ertService: ErtService, private userInfoService: UserinfoService,
    private workspaceHeaderService: WorkspaceHeaderService) { }

  ngOnInit() {
  }

}
