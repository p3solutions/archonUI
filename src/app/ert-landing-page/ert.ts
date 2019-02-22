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
    isSelected = false;
    filterNconfig = new FilterAndOrderConfig();
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
    originalColumnName = '';
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

export class ErtJobParams {
    ertJobTitle = '';
    ertJobMode = '';
}

export class TableDetailsListObj {
    tableId = '';
    tableName = '';
    modifiedTableName = '';
    isMainTable = true;
    columnList: ColumnListObj[] = [];
    usrDefinedColumnList: UsrDefinedColumnListObj[] = [];
    filterAndOrderConfig = new FilterAndOrderConfig();
    isSelected = false;
    relatedTableDetails: RelatedTableDetails[] = [];
}

export class RelatedTableDetails {
    tableId = '';
    tableName = '';
}

export class ERTJobs {
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

export interface FilterConfigTree {
    root: FilterConfigNode;
}

export interface FilterConfigNode {
    id: number;
    operation: string;
    displayAND: boolean;
    displayOR: boolean;
    column: string;
    condition: string;
    value: string;
    children: FilterConfigNode[];
}

export class ExtractDataConfigInfo {
    titleName = '';
    xmlFileSplitSize = '100';
}

export class DataOrderConfig {
    column: string = null;
    order: string = null;
}
