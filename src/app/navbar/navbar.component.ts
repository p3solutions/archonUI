import { Component, OnInit } from '@angular/core';
import { Info } from '../info';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  info: Info;
  constructor(private infoservice: InfoService) { }
  ngOnInit() {
    this.getInfo();
  }
  // Get information from the info service
  getInfo(): void {
    this.infoservice.getinfo().subscribe(info => {
      this.info = info;
      if (this.info.role === 'Admin') {
        this.info.show = true;
      }
    });
  }
}
