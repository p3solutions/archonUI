export class UserObject {
    id: string;
    name: string;
    emailAddress: string;
}
export class OwnerObject {
    id: string;
    name: string;
}
export class RoleObject {
    roleId: string;
    roleName: string;
}
export class WorkspaceRolesObject {
    id: string;
    createdAt: number;
    updatedAt: number;
    roleName: string;
    selected: boolean;
}
export class ServiceActionsObject {
    iconName: string;
    serviceName: string;
    serviceId: string;
    serviceActionType: string;
}
export class MemberObject {
    createdAt: number;
    updatedAt: number;
    user: UserObject;
    workspaceRole: RoleObject;
    serviceActions: ServiceActionsObject;
}
export class DatabaseObject {
    id: string;
    name: string;
    type: string;
}
export class WorkspaceObject {
    id: number;
    createdAt: number;
    updatedAt: number;
    workspaceName: string;
    owner: OwnerObject;
    loggedInUserRole: RoleObject;
    masterMetadataVersion: number;
    members: MemberObject[];
    databases: DatabaseObject[];
    workspaceState: string;
    lastUpdatedTime: string; // for testing purpose, it is string format
}
export interface AnyObject {
    [key: string]: any;
}

export class ConfiguredDB {
    id: string;
    createdAt: number;
    createdDate: string; // = new Date(this.createdAt).toDateString(); // for formated dates
    updatedAt: number;
    databaseName: string;
    host: string;
    type: string;
    port: number;
    userName: string;
    owner: OwnerObject;
    databaseTypeInfo: DatabaseObject;

}


export class CreateConfigDBObject {
    ownerId: string;
    databaseName: string;
    host: string;
    port: string;
    schemaName: string;
    userName: string;
    password: string;
    authType: string;
    supportedDBId: string;
}

export class RelationshipInfoObject {
    secondaryTable: string;
    definitionType: string;
    joinName: string;
}


