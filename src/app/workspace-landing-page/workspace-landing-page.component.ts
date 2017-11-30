import { Component, OnInit } from '@angular/core';
import { Info } from '../info';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-workspace-landing-page',
  templateUrl: './workspace-landing-page.component.html',
  styleUrls: ['./workspace-landing-page.component.css']
})
export class WorkspaceLandingPageComponent implements OnInit {

  info: Info;
  constructor(private infoservice: InfoService) { }
  ngOnInit() {
    this.getInfo();
  }
  // Get information from the info service
  getInfo(): void {
    this.infoservice.getinfo(this.infoservice.infoUrl).subscribe(info => {
      this.info = info;
      if (this.info.role === 'Admin') {
        this.info.show = true;
      }
    });
  }
}
