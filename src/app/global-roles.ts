export interface GlobalRoles {
    id: string;
    roleName: string;
    createdAt: string;
}


export class GlobalRolesList {
    id = '';
    createdAt = '';
    updatedAt = '';
    roleName = '';
}

export class GlobalGroup {
    id = '';
    createdAt = '';
    updatedAt = '';
    groupName = '';
    rank = '';
    globalRoles: GlobalRolesList[] = [];
}

export class UserInvite { // DTO
    emailAddress = '';
    globalGroup = '';
    businessJustification = '';
    globalGroupList: GlobalGroup[] = [];
}

export class UserInviteResponse { // Model
    id = '';
    firstName = '';
    lastName = '';
    // status = '';
    action = 'Select Action';
    createdBy = '';
    // updatedBy = '';
    createdAt = '';
    updatedAt = '';
    emailAddress = '';
    globalGroup = '';
    globalGroupId = '';
    businessJustification = '';
    accessRevoked = '';
    accountLocked = '';
    invitedByUser = '';
    softDeleted = '';
    links: Links[] = [];
}

export class Links {
    rel = '';
    href = '';
    hreflang = '';
    media = '';
    title = '';
    type = '';
    deprecation = '';
}

export class RolesInfo {
    id = '';
    createdAt = '';
    updatedAt = '';
    corelatedInstanceId = '';
    instanceId = '';
    roleName = '';
    softDeleted = '';
}

