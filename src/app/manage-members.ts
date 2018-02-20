import { UserObject, RoleObject } from './workspace-objects';

export interface ManageMembers {
    createdAt: number;
    updatedAt: number;
    user: UserObject;
    workspaceRole: RoleObject;
}
