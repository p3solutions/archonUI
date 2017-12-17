import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-workspace-panel',
  templateUrl: './workspace-panel.component.html',
  styleUrls: ['./workspace-panel.component.css']
})
export class WorkspacePanelComponent implements OnInit {

  title : string ="";
  constructor(private route : ActivatedRoute) {
    this.title = route.snapshot.params['title'];
   }

  ngOnInit() {
    console.log(this.route);
  }

}
