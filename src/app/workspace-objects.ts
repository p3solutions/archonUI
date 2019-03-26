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
    id: string;
    roleId: string;
    roleName: string;
    name: string;
    createdAt: number;
    updatedAt: number;
    softDeleted: boolean;
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
    desc: string;
}
export class MemberObject {
    id: string;
    createdAt: number;
    updatedAt: number;
    user: UserObject;
    workspaceRole: RoleObject;
    serviceActions: ServiceActionsObject;
    softDeleted: boolean;
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
    softDeleted: boolean;
    databaseList: any[];
    workspaceRole: RoleObject;
}
export interface AnyObject {
    [key: string]: any;
}

export class ConfiguredDB {
    id: string;
    createdAt: number;
    createdDate: string; // = new Date(this.createdAt).toDateString(); // for formated dates
    updatedAt: number;
    profileName:string;
    databaseName: string;
    host: string;
    type: string;
    port: number;
    schemaName:string;
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
    relationshipInfo: [
        {
            tableId: string;
            primaryTable: string;
            secondaryTable: string;
            definitionType: string;
            joinName: string;
            joinListInfo: [
                {
                    primaryTable: string;
                    primaryColumn: string;
                    secondaryTable: string;
                    secondaryColumn: string;
                }
            ];
            createdAt: string;
            updatedAt: string;
            softDeleted: boolean;
        }];
}
