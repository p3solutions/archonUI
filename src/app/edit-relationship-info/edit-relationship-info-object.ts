export class JoinValues {
    relationshipId: string;
    primaryColumn: {
        columnId: string;
        columnName: string;
        dataType: string;
    };
    secondaryColumn: {
        columnId: string;
        columnName: string;
        dataType: string;
    };
    defaultSecondaryColumn = false;
 }
 export class SecondaryColumn {
    columnId: string;
    columnName: string;
    dataType: string;
 }

