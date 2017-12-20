import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { MemberRequestService } from '../member-request.service';
import { MemberRequestData } from '../member-request-data';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-member-request',
  templateUrl: './member-request.component.html',
  styleUrls: ['./member-request.component.css']
})
export class MemberRequestComponent implements OnInit {

  @Output() changes = new EventEmitter();

  memberRequestData: MemberRequestData[];

  isAvailable : boolean;
  
  componentTitle : string = 'chandruashwin';
  
  constructor(private memberRequestService: MemberRequestService) {
    this.isAvailable = false;
  }

  ngOnInit(){
    this.getMemberRequestData();
    // console.log("***********");
    // this.route.data
    // .subscribe(data =>
    //   this.componentTitle = data.title);
    // console.log(this.componentTitle);
  }
  
  getMemberRequestData() {
    this.memberRequestService.getMemberRequestDetails()
      .subscribe(data => {
        this.memberRequestData = data; 
        this.isAvailable = true;       
      });
      console.log(this.memberRequestData+"*************");

  }
}
