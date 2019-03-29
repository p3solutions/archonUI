export interface GlobalRoles {
    id: string;
    roleName: string;
    createdAt: string;
}

export class UserInvite {
    emailAddress = '';
    globalGroup = '';
    businessJustification = '';
}