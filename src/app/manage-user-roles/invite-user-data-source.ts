import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { AdhocService } from '../adhoc-landing-page/adhoc.service';
import { CollectionViewer } from '@angular/cdk/collections';
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
            this.totalUserSubject.next(result.data.model.totalUser);
            this.inviteUsersSubject.next(result.data.model.users);
        });
    }
}
