import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-request',
  templateUrl: './member-request.component.html',
  styleUrls: ['./member-request.component.css']
})
export class MemberRequestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.data();
  }
  data(){
    console.log('hai chandruashwin');
  }

}
