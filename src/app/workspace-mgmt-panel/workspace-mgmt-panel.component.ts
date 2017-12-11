import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-workspace-mgmt-panel',
  templateUrl: './workspace-mgmt-panel.component.html',
  styleUrls: ['./workspace-mgmt-panel.component.css']
})
export class WorkspaceMgmtPanelComponent implements OnInit {

  @Input() role: string;

  constructor() { }

  ngOnInit() { }

}
