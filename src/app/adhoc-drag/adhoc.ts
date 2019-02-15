export class Adhoc {
}

export class AdhocTableListObj {
    ertTableList: AdhocTableObj[];
    sourceTableCount = 0;
    selectedTableCount = 0;
    isSelectedTableLeft = false;
}

export class AdhocTableObj {
    tableId = '';
    tableName = '';
    modifiedTableName = '';
    isTableChecked = false;
}

export class AdhocColumnListObj {
    columnName = '';
    originalColumnName = '';
    modifiedColumnName = '';
    dataType = '';
    isPrimaryKey = false;
    viewQuery = null;
    isSelected = true;
    configQueryPreview = '';
    userColumnQuery = '';
}


export class ColumnListObj {
    originalColumnName = '';
    columnName = '';
    modifiedColumnName = '';
    dataType = '';
    isPrimaryKey = false;
    isSelected = false;
    configQueryPreview = '';
    userColumnQuery = '';
    viewQuery = '';
}

export class UsrDefinedColumnListObj {
    columnName = '';
    modifiedColumnName = '';
    dataType = 'USERDEFINED';
    isSelected = true;
    viewQuery = '';
    userColumnQuery = '';
}

export class FilterAndOrderConfig {
    filterConfig = '';
    filterQuery = '';
}

export class AdhocJobParams {
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

export class AdhocJobs {
    jobStatus = '';
    jobId = '';
    createdDate = '';
    jobMode = '';
    jobTitle = '';
}

export class IngestionDataConfig {
    infoArchiveName = '';
    infoArchiveSchemaName = '';
    infoArchiveUserName = '';
    infoArchivePassword = '';
}