import { RoleObject } from './workspace-objects';
export class Info {
    id: number;
    username: string;
    roles: RoleObject;
    show = false;
    roleList: RoleObject[] = [];
}
