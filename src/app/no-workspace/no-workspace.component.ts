import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-no-workspace',
  templateUrl: './no-workspace.component.html',
  styleUrls: ['./no-workspace.component.css']
})
export class NoWorkspaceComponent implements OnInit {
  @Input() noWorkspace: boolean;
  constructor() { }

  ngOnInit() {
  }

}
