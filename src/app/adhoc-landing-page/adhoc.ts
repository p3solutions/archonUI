import { FormGroup } from '@angular/forms';

export class ApplicationInfo {
    id = '';
    createdAt = '';
    updatedAt = '';
    workspaceId = '';
    metadataVersion = '';
    appName = '';
    appDesc = '';
}

// export class ScreenInfo {
//     id = '';
//     //position: number; // frontend
//     screenName = '';
//     screenDesc = '';
//     createdAt = '';
//     updatedAt = '';
//     applicationInfo = new ApplicationInfo();
//     appId = '';
//     "workspaceId": "5c876f12068c2311147b6bf9",
//     "schemaName": "SH",
//         "sessionAdhocModel": null,
//             "softDeleted": false
// }

// id
// createdAt": 1552972646,
// updatedAt": 1552972646,
// appId": "5c9018a7068c235749a47d7f",
// screenName": "Screen - ",
// screenDesc": null,
// applicationInfo": {
// id": "5c9018a7068c235749a47d7f",
// createdAt": 1552947367,
// updatedAt": 1552947367,
// appName": "app5 - test",
// appDesc": "app2 is name of application in adhoc query",
// workspaceId": "5c876f12068c2311147b6bf9",
// metadataVersion": "12",
// softDeleted": false
//         }
// "workspaceId": "5c876f12068c2311147b6bf9",
//     "schemaName": "SH",
//         "sessionAdhocModel": null,
//             "softDeleted": false


export class TableColumnNode {
    id: string;
    name: string;
    type: string;
    visible: boolean;
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
}

export class AdhocHeaderInfo {
    workspaceName: string;
    screenName: string;
    appName: string;
    metadataVersion: string;
    workspaceId: string;
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
    resultFields: ResultFields[] = [];
}

export class InlinePanel {
    tabs: Tab[] = [{ 'tabName': 'Tab 1', 'tabOrder': 0, 'resultFields': [] }];
}

export class SidePanel {
    tabs: Tab[] = [{ 'tabName': 'Tab 1', 'tabOrder': 0, 'resultFields': [] }];
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
    todecrypt = true;
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
}


export const inputFunctionList: InputFunctionsInfo[] = [{
    'sequenceNo': 0,
    'functionName': 'Gender Description Common', 'functionDesc': 'Converts gender acronym into its description values.'
    , 'text': `declare function local:genderDesc1($field){\n
    if($field = 'M') then 'Male'\n
    else if($field = 'm') then 'Male'\n
    else if($field = 'F') then 'Female'\n
    else if($field = 'f') then 'Female'\n
    else if($field = 'U') then 'Unknown'\n
    else if($field = 'u') then 'Unknown' else 'Unknown'\n
    }`, 'input': ['M', 'm', 'F', 'f', 'U', 'u'], 'output': ['Male', 'Male', 'Female', 'Female', 'Unknown', 'Unknown']
},
{
    'sequenceNo': 1,
    'functionName': 'Gender Description to acronym', 'functionDesc': 'Converts gender description to its acronym.'
    , 'text': `declare function local:genderDesc2($field){\n
      if(lower-case($field) = 'male') then 'M'\n
      else if(lower-case($field) = 'female') then 'F'\n
      else 'U'\n
    };`, 'input': ['M', 'm', 'F', 'f', 'U', 'u'], 'output': ['Male', 'Male', 'Female', 'Female', 'Unknown', 'Unknown']
},
{
    'sequenceNo': 2,
    'functionName': 'Date From YYYY-MM-DD to MM-DD-YYYY', 'functionDesc': 'Convert Date from yyyy-mm-dd to mm-dd-yyyy'
    , 'text': `declare function local:dateymd2mdy($field){\n
      if($field = '')\n
      then ''\n
      else\n
        concat(substring($field,6),'-',substring($field,1,4))\n
    };`, 'input': ['2018-01-01', '1970-12-31'], 'output': ['01-01-2018', '12-31-1970']
},
{
    'sequenceNo': 3,
    'functionName': 'Date From YYYY-MM-DD to YYYYMMDD', 'functionDesc': 'Convert Date from yyyy-mm-dd to yyyymmdd'
    , 'text': `declare function local:dateyyyymmdd($field){\n
      if($field = '')\n
      then ''\n
      else\n
        concat(substring($field,1,4),substring($field,6,2),substring($field,9,2))\n
    };`, 'input': ['2018-01-01', '1970-12-31'], 'output': ['20180101', '19701231']
},
{
    'sequenceNo': 4,
    'functionName': 'Date From YYYYMMDD To MM-DD-YYYY', 'functionDesc': 'Convert Date from yyyymmdd to mm-dd-yyyy '
    , 'text': `declare function local:date_mm_dd_yyyy($field){\n
      if($field = '')\n
      then ''\n
      else\n
        concat(substring($field,5,2),'-',substring($field,7,2),'-',substring($field,1,4))\n
    };`, 'input': ['20180101', '19701231'], 'output': ['01-01-2018', '12-31-1970']
}
];

export function checkOption(controlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const control1 = formGroup.controls['fieldType'];
        const optionArray: Option[] = [];
        let tempOption;
        if (control.errors && !control.errors.mustMatch) {
            return;
        }
        if (control1.value === 'TEXT') {
            control.setErrors(null);
        } else {
            const tempOptions = control.value.split(/[\r\n]+/g);
            for (const option of tempOptions) {
                tempOption = option.split(',');
                if (tempOption[0] !== undefined && tempOption[1] !== undefined) {
                    if (tempOption[0].trim() !== '' && tempOption[1].trim() !== '') {
                        optionArray.push({ 'label': tempOption[0].trim(), 'value': tempOption[1].trim() });
                        control.setErrors(null);
                    } else {
                        control.setErrors({ mustMatch: true });
                    }
                } else {
                    control.setErrors({ mustMatch: true });
                }
            }
        }
    };
}
