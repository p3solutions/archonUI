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
    workspaceRole: RolePojo;
    masterMetadataVersion: number;
    databases: DatabasePojo;
}
