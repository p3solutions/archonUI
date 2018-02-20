import { UserPojo, RolePojo } from './WorkspacePojo';

export interface ManageMembers {
    createdAt: number;
    updatedAt: number;
    user: UserPojo;
    role: RolePojo;
}
