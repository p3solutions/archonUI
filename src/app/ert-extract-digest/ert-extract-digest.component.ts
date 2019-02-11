import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ert-extract-digest',
  templateUrl: './ert-extract-digest.component.html',
  styleUrls: ['./ert-extract-digest.component.css']
})
export class ErtExtractDigestComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  gotoTableExtraction() {
    this.router.navigate(['workspace/ert/ert-table']);
  }
}
