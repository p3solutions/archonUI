class OwnerPojo {
    id: string;
    name: string;
}

class RolePojo {
    id: string;
    name: string;
}

class DatabasePojo {
    id: string;
    name: string;
}

export class WorkspacePojo {
    id: number;
    createdAt: number;
    updatedAt: number;
    workspaceName: string;
    owner: OwnerPojo;
    role: RolePojo;
    masterMetadataVersion: number;
    databases: DatabasePojo;
}
