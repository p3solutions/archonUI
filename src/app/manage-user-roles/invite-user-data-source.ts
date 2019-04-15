import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { UserInviteResponse } from '../global-roles';
import { ManageUserRolesService } from './manage-user-roles.service';
import { map } from 'rxjs/operators';

export class InviteUserDataSource implements DataSource<UserInviteResponse> {

    totalUser: number;
    private inviteUsersSubject = new BehaviorSubject<UserInviteResponse[]>([]);
    public totalUserSubject = new BehaviorSubject<number>(0);
    private readonly _filter = new BehaviorSubject<string>('');
    filteredData: UserInviteResponse[];
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
        accessRevoked = accessRevoked === null ? '' : accessRevoked;
        accountLocked = accountLocked === null ? '' : accountLocked;
        if (invited === false) {
            this.manageUserRolesService.getAllUsers(startIndex, accessRevoked, accountLocked).subscribe((result) => {
                result.data.users.usersList.forEach((value, index) => {
                    value.status = this.getStatus(value);
                    value.action = 'Select Action';
                });
                this.inviteUsersSubject.next(result.data.users.usersList);
            });
        } else {
            this.getInviteUsers(startIndex);
        }
    }

    getUsersByEmailId(emailId) {
        this.manageUserRolesService.getUserByEmailId(emailId).subscribe((result) => {
            result.data.forEach((value, index) => {
                value.status = this.getStatus(value);
                value.action = 'Select Action';
            });
            this.inviteUsersSubject.next(result.data);
        });
    }

    getStatus(param): string {
        let tempStatus = '';
        if (param.accessRevoked === true && param.accountLocked === true) {
            tempStatus = 'Revoked';
        } else if (param.accessRevoked === true && param.accountLocked === false) {
            tempStatus = 'Revoked';
        } else if (param.accessRevoked === false && param.accountLocked === true) {
            tempStatus = 'Locked';
        } else if (param.accessRevoked === false && param.accountLocked === false) {
            tempStatus = 'Active';
        }
        return tempStatus;
    }

    filterPredicate: ((data: UserInviteResponse, filter: string) => boolean) = (data: UserInviteResponse, filter: string): boolean => {
        const accumulator = (currentTerm, key) => currentTerm + data[key];
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
    }

    _filterData(dataSource: UserInviteResponse[]) {
        this.filteredData =
            !this.filter ? dataSource : dataSource.filter(obj => this.filterPredicate(obj, this.filter));
        this.inviteUsersSubject.next(this.filteredData);
        return this.filteredData;
    }



    get filter(): string { return this._filter.value; }
    set filter(filter: string) {
        this._filter.next(filter);
    }
}
