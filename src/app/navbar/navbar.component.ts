import { Component, OnInit, OnChanges, SimpleChanges, Input, ViewChild, ElementRef } from '@angular/core';
import { Info } from '../info';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { UserProfileService } from '../user-profile/user-profile.service';
import { NavbarService } from './navbar.service';
import { UserinfoService } from '../userinfo.service';
import { browserRefresh } from '../app.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { WorkspaceServicesService } from '../workspace-services/workspace-services.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', './hamburger.scss']


})
export class NavbarComponent implements OnInit {
  info: Info;
  userChangeName: string;
  rolesForManage: string[] = ['ADMIN', 'MANAGE_DB', 'SUPER'];
  enableAuditArray = ['ROLE_AUDIT'];
  enableAudit = false;
  notifiactionArray = [];
  count = 0;
  loadfirst = 0;
  userid;
  license = '';
  @ViewChild('licensebutton') button: ElementRef;
  userId: any;
  @ViewChild('succesdismiss') success: ElementRef;
  uploadForm: FormGroup;
  errorlicense = false;

  constructor(private userProfileService: UserProfileService , private navService: NavbarService,
     private userinfoService: UserinfoService, private router: Router,
     private activatedrouter: ActivatedRoute, private formBuilder: FormBuilder,
     private workspaceService: WorkspaceServicesService) { }
  ngOnInit() {
    this.userId = this.userinfoService.getUserId();
    setTimeout(() => {
      this.license = this.activatedrouter.snapshot.queryParamMap.get('license');
      if (this.license === 'no') {
        const el: HTMLElement = this.button.nativeElement as HTMLElement;
        el.click();
      }
    }, 1000);
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
    if (browserRefresh) {
      this.router.navigate(['/workspace/workspace-dashboard']);
    }
    const check = this.userinfoService.getRoleList();
    for (const i of check) {
      if (this.enableAuditArray.includes(i)) {
        this.enableAudit = true;
        break;
      }
    }
    this.userProfileService.UserNamechange.subscribe(data => {
      this.userChangeName = data;
      this.getInfo();
    });
    this.info = this.getInfo();
    for (const item of this.info.roleList) {
      for (const role of this.rolesForManage) {
        if (item.roleName.toUpperCase().trim().includes(role)) {
          this.info.show = true;
          break;
        }
      }
    }

    $(document).ready(function () {
      $('.button').click(function () {
        $(this).closest('body').toggleClass('active');
      });
    });
    this.getNotification();
  }

  // Get information from the info service
  getInfo(): Info {
    let info: Info;
    let accessToken: string;
    let token_data: any;
    const jwtHelper: JwtHelperService = new JwtHelperService();
    const userId = sessionStorage.getItem('userId');
    accessToken = localStorage.getItem(userId);
    token_data = jwtHelper.decodeToken(accessToken);
    info = new Info();
    info.id = token_data.user.id;
    this.userid = token_data.user.id;
    info.roleList = token_data.roles;
    info.username = this.userChangeName;
    return info;
  }
  callUserProfile() {
    localStorage.setItem('userId', '');
  }
  logout() {
    const userId = sessionStorage.getItem('userId');
    localStorage.removeItem(userId);
    sessionStorage.clear();
    this.router.navigate(['sign-in']);
  }



  getNotification() {
    if (this.loadfirst === 0) {
      this.loadfirst = 1;
      this.navService.getNotification().subscribe(result => {
        this.notifiactionArray = [];
        this.count = 0;
        this.notifiactionArray = result;
        for (let index = 0; index < this.notifiactionArray.length; index++) {
          if (this.notifiactionArray[index].origin === 'DB_APPROVAL') {
            this.notifiactionArray[index].route = '/management-landing-page/database-list';
          }
        }
        for (const i of this.notifiactionArray) {
          if (i.read === false) {
            this.count = this.count + 1;
          }
        }
        this.getNotification();
      });
    } else {
      setInterval(() => {
        this.navService.getNotification().subscribe(result => {
          this.notifiactionArray = [];
          this.count = 0;
          this.notifiactionArray = result;
          for (const i of this.notifiactionArray) {
            if (i.read === false) {
              this.count = this.count + 1;
            }
          }
        });
      }, 600000);
    }
  }

  updateNotification(id) {
    this.navService.updateNotification(id).subscribe(result => {
      this.loadfirst = 0;
      this.getNotification();
    });
  }

  uploadFile(file) {
    if (file.length > 0) {
      this.workspaceService.uploadLicense(file[0]).subscribe((result) => {
        const el: HTMLElement = this.success.nativeElement as HTMLLIElement;
        el.click();
        window.location.href = window.location.href;
      }, (err) => {
        this.errorlicense = true;
      }
      );
    }
  }

}
