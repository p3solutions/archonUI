import { Component, OnInit } from '@angular/core';
import {Info} from '../info';
@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent implements OnInit {

  constructor() { }

  dataObj : Info;
  ngOnInit() {
  }

}
