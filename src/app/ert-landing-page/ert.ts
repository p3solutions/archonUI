export class Ert {
}

export class ErtTableListObj {
    ertTableList: ErtTableObj[];
    sourceTableCount = 0;
    selectedTableCount = 0;
    isSelectedTableLeft = false;
}

export class ErtTableObj {
    tableId = '';
    tableName = '';
    modifiedTableName = '';
    isTableChecked = false;
}

export class ErtColumnListObj {
    columnName = '';
    originalColumnName = '';
    modifiedColumnName = '';
    dataType = '';
    isPrimaryKey = false;
    viewQuery = null;
    isSelected = true;
    configQueryPreview = '';
}


export class ColumnListObj {
    originalColumnName = '';
    columnName = '';
    modifiedColumnName = '';
    dataType = '';
    isPrimaryKey = false;
    isSelected = false;
    configQueryPreview = '';
}

export class UsrDefinedColumnListObj {
    columnName = '';
    modifiedColumnName = '';
    dataType = 'USERDEFINED';
    isSelected = true;
    sequenceQuery = '';
    viewQuery = '';
}

export class FilterAndOrderConfig {
    filterConfig = '';
    filterQuery = '';
}

export class ErtJobParams {
    ertJobTitle = '';
    ertJobMode = '';
}

export class TableDetailsListObj {
    tableId = '';
    tableName = '';
    modifiedTableName = '';
    columnList: ColumnListObj[] = [];
    usrDefinedColumnList: UsrDefinedColumnListObj[] = [];
    filterAndOrderConfig = new FilterAndOrderConfig();
    isSelected = false;
}

export class ERTJobs {
    jobStatus = '';
    jobId = '';
    createdDate = '';
}



