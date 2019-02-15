import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ert-datarecord-config',
  templateUrl: './ert-datarecord-config.component.html',
  styleUrls: ['./ert-datarecord-config.component.css']
})
export class ErtDatarecordConfigComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  gotoDataRecFinal() {
    this.router.navigate(['workspace/ert/ert-datarecord-final']);
  }
}
