export class StoredProcView {

}


export class SelectedTableNameListObj {
    tableId = '';
    tableName = '';
}

export class TableNameAndRelatingTable {
    workspaceId = '';
    tableId = '';
    tableName = '';
    spvInfo: SpvInfo = new SpvInfo();
}

export class SpvInfo {
    type = '';
    name = '';
    relatingTableList: RelatingTableList[] = [];
}

export class RelatingTableList {
    tableId = '';
    tableName = '';
    joinInfoList: JoinInfoList[] = [];
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
