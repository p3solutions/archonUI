import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ert-jobs-config',
  templateUrl: './ert-jobs-config.component.html',
  styleUrls: ['./ert-jobs-config.component.css']
})
export class ErtJobsConfigComponent implements OnInit {

  constructor(public route: Router) { }

  ngOnInit() {
  }

  goToExtraction(event) {
    console.log(event);
    this.route.navigate(['/workspace/ert/ert-table']);
  }
}
