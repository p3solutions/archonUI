export interface ManageUserRoles {
    id: string;
    createdAt: number;
    name: string;
    emailAddress: string;
    // last_activity_time: string;
    globalRoles: any[];
}

/*
"id": "5a3ba85e4ca51516a7573982",
"createdAt": 1513859166,
"name": "Test User",
"emailAddress": "test@test.com",
"globalRoles": [
    {
        "id": "5a3b9d138ce32b109441f5a6",
        "createdAt": 1513856275,
        "roleName": "ROLE_NOT_ASSIGNED"
    }
]*/