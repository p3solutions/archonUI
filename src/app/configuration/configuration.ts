export class SMTPConfiguration {
    host = '';
    port = null;
    username = '';
    password = '';
}

export class RoleInfo {
    roleId = '';
    roleName = '';
    checked = false;
}

export class RoleGroupInfo {
    groupName = '';
    roleUser: RoleInfo = new RoleInfo();
    roleAudit: RoleInfo = new RoleInfo();
    roleAdmin: RoleInfo = new RoleInfo();
    roleManageDb: RoleInfo = new RoleInfo();
    roleManageArchon: RoleInfo = new RoleInfo();
    roleSuper: RoleInfo = new RoleInfo();
}
