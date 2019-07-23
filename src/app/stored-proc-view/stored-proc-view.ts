export class StoredProcView {

}


export class SelectedTableNameListObj {
    tableId = '';
    tableName = '';
}

export class SpvInfo {
    isIndeterminate = false;
    isSelected = false;
    type = '';
    name = '';
    relatingTableList: RelatingTableList[] = [];
}

export class TableNameAndRelatingTable {
    workspaceId = '';
    tableId = '';
    tableName = '';
    spvInfo: SpvInfo = new SpvInfo();
}

export class RelatingTableList {
    tableId = '';
    tableName = '';
    isSelected = true;
    joinInfoList: JoinInfoList[] = [];
    spvRelatedTableList: { tableId: string, tableName: string, pColumn: string, sColumn: string, dataType: string }[] = [];
}

export class JoinInfoList {
    primaryColumn: { columnId: string, columnName: string, dataType: string } = { columnId: '', columnName: '', dataType: '' };
    secondaryColumn: { columnId: string, columnName: string, dataType: string } = { columnId: '', columnName: '', dataType: '' };
}

export class SpvNameList {
    workspaceId = '';
    tableId = '';
    tableName = '';
    spvInfoList: { type: string, name: string }[] = [];
}


export class ColumnList {
    tableId = '';
    tableName = '';
    pColumn = '';
    sColumn = '';
    dataType = ''
}
