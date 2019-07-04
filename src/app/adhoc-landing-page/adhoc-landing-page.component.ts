import { Component, OnInit } from '@angular/core';
import { AdhocService } from './adhoc.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adhoc-landing-page',
  templateUrl: './adhoc-landing-page.component.html',
  styleUrls: ['./adhoc-landing-page.component.css']
})
export class AdhocLandingPageComponent implements OnInit {

  constructor(private adhocService: AdhocService, public router: Router) { }

  ngOnInit() {
    // this.router.navigate(['/workspace/adhoc']);
  }
}
