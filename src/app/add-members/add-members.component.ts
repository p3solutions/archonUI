import { Component, OnInit } from '@angular/core';
import { AddMembersService } from './add-members.service';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.css']
})
export class AddMembersComponent implements OnInit {
  userList = [];
  isProgress: boolean;
  constructor( private addMembersService: AddMembersService ) { }

  ngOnInit() {
    this.isProgress = false;
    this.getUserList();
  }

  getUserList() {
    this.addMembersService.getAllUsers()
    .subscribe(res => {
      this.userList = res;
      // console.log('add-members function console', this.userList[1]['name']);
      this.isProgress = true;
    });

  }

}
