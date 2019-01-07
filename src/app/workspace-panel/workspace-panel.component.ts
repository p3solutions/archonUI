import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-workspace-panel',
  templateUrl: './workspace-panel.component.html',
  styleUrls: ['./workspace-panel.component.css']
})
export class WorkspacePanelComponent implements OnInit {
  // this.route.data
  // .subscribe((data: { crisis: Crisis }) => {
  //   this.editName = data.crisis.name;
  //   this.crisis = data.crisis;
  // });

  componentTitle: String = 'chandruashiwn';
  sub: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() { }

}
