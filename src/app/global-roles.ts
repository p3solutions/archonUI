export interface GlobalRoles {
    id: string;
    roleName: string;
    createdAt: string;
}

export class UserInvite { // DTO
    emailAddress = '';
    globalGroup = '';
    businessJustification = '';
}

export class UserInviteResponse { // Model
    id = '';
    createdAt = '';
    updatedAt = '';
    emailAddress = '';
    globalGroup = '';
    businessJustification = '';
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



