export const archonConfig = {
    workSpaceAllowedAdmins: ['ROLE_ADMIN', 'ROLE_DB_ADMIN'] ,
    addMembersRoles: ['ROLE_MEMBER', 'ROLE_ADMIN', 'ROLE_NOT_ASSIGNED'],
    dataBaseListRoles: ['ROLE_DB_ADMIN', 'ROLE_SUPER_ADMIN', 'ROLE_DB_MEMBER'],
    navBarAllowedAdmins: ['ROLE_ADMIN', 'ROLE_DB_ADMIN', 'ROLE_SUPER_ADMIN', 'ROLE_DB_MEMBER'],
    Urls: {
     managementPanelRoute : 'workspace/management-panel',
     userRolesRoute: 'workspace/manage-user-roles',
     wokspaceRoute: 'workspace/workspace-list',
     workspaceServiceRoute: 'workspace/workspace-dashboard/workspace-services',
     databaseListRoute: 'workspace/database-list',
     metalyzerReadRoute: '/workspace/metalyzer/READ/analysis',
     metalyzerWriteRoute: '/workspace/metalyzer/WRITE/configuration',
     metalyzerAllRoute: 'workspace/metalyzer/ALL/analysis',
     workSpaceRoute: '/workspace',
     dashboardRoute: 'workspace/workspace-dashboard',
     noworkspaceRoute: 'workspace/no-workspace',
     metalyzerAllConfigRoute: '/workspace/metalyzer/ALL/configuration'
    }
};


