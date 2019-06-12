

export class ApplicationInfo {
    id = '';
    createdAt = '';
    updatedAt = '';
    workspaceId = '';
    metadataVersion = '';
    appName = '';
    appDesc = '';
    iaVersion = '';
    iaVersionList: string[] = [];
}

export class TableColumnNode {
    id: string;
    name: string;
    type: string;
    visible: boolean;
    dataType: string;
    columns?: TableColumnNode[] = [];
}


export class Option {
    label: string;
    value: string;
}
export class OptionInfo {
    optionString = '';
    option: Option[] = [];
}
export class SearchCriteria {
    tableId: string;
    columnId: string;
    ordinal: number;
    tableName: string; // table name
    name: string; // column name
    label: string;
    fieldType = 'TEXT';
    searchType = '=';
    inputFunction = '';
    isRequired = false;
    optionInfo = new OptionInfo();
    isDateRange = false;
    isHidden = false;
    isEncrypted = false;
    isBetween = false;
    isBetweenInclusive = false;
    src = '';
    notSelected = false;
    dataType = '';
}

export class AdhocHeaderInfo {
    workspaceName: string;
    screenName: string;
    appName: string;
    metadataVersion: string;
    appMetadataVersion: string;
    workspaceId: string;
    appId = '';
}

export class InputFunctionsInfo {
    sequenceNo: number;
    functionName: string;
    functionDesc: string;
    text: string;
    input: string[] = [];
    output: string[] = [];
}

export class Tab {
    tabName = 'Tab';
    tabOrder = 0;
    isTabRename = false;
    resultFields: ResultFields[] = [];
}

export class InlinePanel {
    tabs: Tab[] = [{ 'tabName': 'Tab 1', 'tabOrder': 0, 'isTabRename': false, 'resultFields': [] }];
}

export class SidePanel {
    tabs: Tab[] = [{ 'tabName': 'Tab 1', 'tabOrder': 0, 'isTabRename': false, 'resultFields': [] }];
}

export class MaskDetail {
    maskType = 'start';
    maskLength = 4;
}

export class ResultFields {
    tableId: string;
    columnId: string;
    ordinal: number;
    schemaName: string;
    tableName: string;
    name: string;
    label: string;
    outputFunction = '';
    maskDetail = new MaskDetail();
    isMaskField = false;
    sorting = 'Disable sorting in this column';
    isEnableFilter = false;
    isHidden = false;
    blob = false;
    encrypted = false;
    todecrypt = false;
    notSelected = false;
}

export class SearchResult {
    mainPanel: ResultFields[] = [];
    inLinePanel = new InlinePanel();
    sidePanel = new SidePanel();
}


export class LinearTableMapOrder {
    ordinal: number;
    tableName = '';
    tableId = '';
}

export class ColumnList {
    columnId = '';
    name = '';
    ordinal = 0;
    type = '';
    typeLength = '';
    index = '';
}

export class JoinList {
    pkTable = '';
    pkColumn = '';
    sourceTableCardinality = '';
    fkTable = '';
    fkColumn = '';
    targetTableCardinality = '';
}


export class RelationshipList {
    joinName = '';
    joinList: JoinList[] = [];
}

export class SelectedTables {
    tableId = '';
    tableName = '';
    schemaName = '';
    columnList: ColumnList[] = [];
    relationshipList: RelationshipList[] = [];
}

export class GraphDetails {
    data = '';
    selectedValues = '';
    joinListMap = '';
    selectedPrimaryTable = '';
}
export class ParentScreenInfo {
    screenId = '';
    screenName = '';
}

export class ChildScreenInfo {
    screenId = '';
    screenName = '';
}

export class NestedLinks {
    searchName = '';
    primaryTable = '';
    version = '4';
    screenDesc = 'Created by Archon';
    screenType = 'Search';
    graphDetails = new GraphDetails();
    linearTableMapOrder: LinearTableMapOrder[] = [];
    searchResult = new SearchResult();
}

export class SessionAdhoc {
    selectedTables: SelectedTables[] = [];
    selectedTableListString = '';
    graphDetails = new GraphDetails();
    primaryTable = '';
    version = '4';
    screenType = 'Search';
    screenId = '';
    linearTableMapOrder: LinearTableMapOrder[] = [];
    searchCriteria: SearchCriteria[] = [];
    searchResult = new SearchResult();
    metadataVersion = '';
}

export class Adhoc {
    metadataVersion = '';
    position = null;
    madeDownlaodDisabled = false;
    link = false;
    appId = '';
    workspaceId = '';
    schemaName = '';
    screenName = '';
    screenDesc = '';
    id = '';
    screenId = '';
    parentScreenInfo = new ParentScreenInfo();
    childScreenInfo: ChildScreenInfo[] = [];
    sessionAdhoc = new SessionAdhoc();
    sessionAdhocModel = new SessionAdhoc();
    userId = '';
    updatedAt = '';
    createdBy = '';
    lastModifiedBy = '';
}
export class SearchTypesByfieldType {
    fieldType = '';
    searchTypes: string[] = [];
}

