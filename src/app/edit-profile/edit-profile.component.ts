import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @Input() username: string;
  @Input() useremail: string;
  @Input() userid: string;

  constructor() { }

  ngOnInit() {
  }

}
