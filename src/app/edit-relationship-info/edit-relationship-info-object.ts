export class JoinValues {
    relationshipId: string;
    primaryColumn: {
        columnId: string;
        columnName: string;
        dataType: string;
        isKey: boolean;
        columnDataType: string;
    };
    secondaryColumn: {
        columnId: string;
        columnName: string;
        dataType: string;
    };
    defaultSecondaryColumn = false;
    automatchColumn = false;
 }
 export class SecondaryColumn {
    columnId: string;
    columnName: string;
    dataType: string;
 }
 export class JoinValueColumn {
    columnId: string;
    columnName: string;
    columnDataType: string;
 }

