

export class ApplicationInfo {
    appId = '';
    appName = '';
    appDesc = '';
}

export class TableColumnNode {
    id: string;
    name: string;
    type: string;
    columns?: TableColumnNode[];
}

export class TableColumnInfo {
    tableId: string;
    tableName: string;
    columns: { columnId: string, columnName: string }[] = [];
    tableColumnTree: string;
}

export class SearchScreenDetail {
    tableColumn = new TableColumnInfo();
    SearchColumnInfo: SearchColumn[];
}

export class ScreenInfo {
    screenId = '';
    Position: number;
    screenName = '';
    screenDesc = '';
    searchScreenDetail = new SearchScreenDetail();
}

export class OptionInfo {
    label: string;
    value: string;
}
export class SearchColumn {
    tableName: string;
    columnName: string;
    label: string;
    fieldType = 'TEXT';
    searchType = '=';
    inputFunction = 'Gender Description Common';
    isMandatoryField = false;
    option: OptionInfo[] = [];
}

export class Adhoc {
    workspaceId: string;
    metadataVersion: string;
    appId: string;
    screenInfo = new ScreenInfo();
}

export class AdhocHeaderInfo {
    workspaceName: string;
    screenName: string;
    appName: string;
    metadataVersion: string;
}
