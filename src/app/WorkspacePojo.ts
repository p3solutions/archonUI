export class UserPojo {
    id: string;
    name: string;
}
export class OwnerPojo {
    id: string;
    name: string;
}

export class RolePojo {
    id: string;
    name: string;
}
export class WorkspaceRolesPojo {
    id: string;
    createdAt: number;
    updatedAt: number;
    roleName: string;
    selected: boolean;
}
export class ServiceActionsPojo {
    serviceName: string;
    serviceId: string;
    serviceActionType: string;
}
export class MemberPojo {
    createdAt: number;
    updatedAt: number;
    user: UserPojo;
    workspaceRole: RolePojo;
    serviceActions: ServiceActionsPojo;
}
export class DatabasePojo {
    id: string;
    name: string;
}

export class WorkspacePojo {
    id: number;
    createdAt: number;
    updatedAt: number;
    workspaceName: string;
    owner: OwnerPojo;
    loggedInUserRole: RolePojo;
    masterMetadataVersion: number;
    members: MemberPojo[];
    databases: DatabasePojo[];
    workspaceState: string;
}
