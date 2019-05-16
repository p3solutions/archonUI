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
    globalGroupIds: string[] = [];
    constructor(private manageUserRolesService: ManageUserRolesService,
        private globalGroupId: string[]) {
        this.globalGroupIds = globalGroupId;
    }


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
                    console.log(this.globalGroupIds);
                    if (this.globalGroupIds.includes(value.globalGroupId)) {
                        value.hide = true;
                    } else {
                        value.hide = false;
                    }
                });
                this.inviteUsersSubject.next(result.data.users.usersList.filter(a => a.hide === true));
            });
        } else {
            this.getInviteUsers(startIndex);
        }
    }

    emptyUser() {
        this.inviteUsersSubject.next([]);

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

    sortfn(sort) {
        const data = this.inviteUsersSubject.getValue().slice();
        console.log(sort, data);
        if (!sort.active || sort.direction === '') {
            const data1 = this.inviteUsersSubject.getValue();
            this.inviteUsersSubject.next(data1);
            return;
          }
        const sortedData = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
              case 'id': return this.compare(a.id, b.id, isAsc);
              case 'firstName': return this.compare(a.firstName.toLowerCase(), b.firstName.toLowerCase(), isAsc);
              case 'lastName': return this.compare(a.lastName.toLowerCase(), b.lastName.toLowerCase(), isAsc);
              case 'globalGroupName': return this.compare(a.globalGroup.toLowerCase(), b.globalGroup.toLowerCase(), isAsc);
              case 'createdAt': return this.compare(a.createdAt, b.createdAt, isAsc);
              case 'createdBy': return this.compare(a.createdBy.toLowerCase(), b.createdBy.toLowerCase(), isAsc);
              case 'updatedAt': return this.compare(a.updatedAt, b.updatedAt, isAsc);
              case 'emailAddress': return this.compare(a.emailAddress.toLowerCase(), b.emailAddress.toLowerCase(), isAsc);
              default: return 0;
            }
          });
          this.inviteUsersSubject.next(sortedData);
        }

      compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
      }

}
