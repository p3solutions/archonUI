import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { AdhocService } from '../adhoc-landing-page/adhoc.service';
import { CollectionViewer } from '@angular/cdk/collections';
import { UserInviteResponse } from '../global-roles';
import { ManageUserRolesService } from './manage-user-roles.service';

export class InviteUserDataSource implements DataSource<UserInviteResponse> {

    totalUser: number;
    private inviteUsersSubject = new BehaviorSubject<UserInviteResponse[]>([]);

    constructor(private manageUserRolesService: ManageUserRolesService) { }

    connect(): Observable<UserInviteResponse[]> {
        return this.inviteUsersSubject.asObservable();
    }

    disconnect(): void {
        this.inviteUsersSubject.complete();
    }

    getInviteUsers(startIndexOfScreen) {
        this.manageUserRolesService.getInviteUsers(startIndexOfScreen).subscribe((result) => {
            this.totalUser = result.data.model.totalIUser;
            this.inviteUsersSubject.next(result.data.model.users);
        });
    }
}
