import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInviteResponse } from '../global-roles';
import { ManageUserRolesService } from './manage-user-roles.service';

export class InviteUserDataSource implements DataSource<UserInviteResponse> {

    totalUser: number;
    private inviteUsersSubject = new BehaviorSubject<UserInviteResponse[]>([]);
    public totalUserSubject = new BehaviorSubject<number>(0);

    constructor(private manageUserRolesService: ManageUserRolesService) { }

    connect(): Observable<UserInviteResponse[]> {
        return this.inviteUsersSubject.asObservable();
    }

    disconnect(): void {
        this.inviteUsersSubject.complete();
    }

    getInviteUsers(startIndexOfScreen) {
        this.manageUserRolesService.getInviteUsers(startIndexOfScreen).subscribe((result) => {
            result.data.model.users.forEach((value, index) => {
                value.status = 'Invited';
            });
            this.totalUserSubject.next(result.data.model.totalUser);
            this.inviteUsersSubject.next(result.data.model.users);
        });
    }
    getAllUsers(startIndex, invited, accessRevoked, accountLocked) {
        if (invited === false) {
            this.manageUserRolesService.getAllUsers(startIndex, accessRevoked, accountLocked).subscribe((result) => {
                result.data.users.usersList.forEach((value, index) => {
                    value.status = this.getStatus(value);
                    value.action = 'Select Action';
                });
                // this.totalUserSubject.next(result.users.usersList);
                this.inviteUsersSubject.next(result.data.users.usersList);
            });
        } else {
            this.getInviteUsers(startIndex);
        }

    }

    getStatus(param): string {
        let tempStatus = '';
        if (param.accessRevoked === true && param.accountLocked === true) {
            tempStatus = 'Locked';
        } else if (param.accessRevoked === true && param.accountLocked === false) {
            tempStatus = 'Revoked';
        } else if (param.accessRevoked === false && param.accountLocked === true) {
            tempStatus = 'Locked';
        } else if (param.accessRevoked === false && param.accountLocked === false) {
            tempStatus = 'Active';
        }
        return tempStatus;
    }
}
