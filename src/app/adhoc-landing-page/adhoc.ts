import { FormGroup } from '@angular/forms';

export class ApplicationInfo {
    appId = '';
    appName = '';
    appDesc = '';
}

export class TableColumnNode {
    id: string;
    name: string;
    type: string;
    visible: boolean;
    columns?: TableColumnNode[] = [];
}

export class TableColumnInfo {
    tableId: string;
    tableName: string;
    columns: { columnId: string, columnName: string }[] = [];
    tableColumnTree: string;
}

export class SearchScreenDetail {
    tableColumn = new TableColumnInfo();
    SearchColumnInfo: SearchColumn[] = [];
}

export class ScreenInfo {
    screenId = '';
    Position: number;
    screenName = '';
    screenDesc = '';
    searchScreenDetail = new SearchScreenDetail();
}

export class Option {
    label: string;
    value: string;
}
export class OptionInfo {
    optionString = '';
    option: Option[] = [];
}
export class SearchColumn {
    tableId: string;
    columnId: string;
    sequenceNo: string;
    tableName: string;
    columnName: string; // name
    label: string;
    fieldType = 'TEXT';
    searchType = '=';
    inputFunction = 'Gender Description Common';
    isMandatoryField = false; // required
    optionInfo = new OptionInfo();
    dateRange = false;
    hidden = false;
    encrypted = false;
}



export class AdhocHeaderInfo {
    workspaceName: string;
    screenName: string;
    appName: string;
    metadataVersion: string;
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
    tabIndex = 0; // taborder
    panelColumn: PanelColumns[] = [];
}

export class MainPanelDetails {
    panelColumn: PanelColumns[] = [];
}

export class InlinePanelDetails {
    tabs: Tab[] = [{ 'tabName': 'Tab 1', 'tabIndex': 0, 'panelColumn': [] }];
}

export class SidePanelDetails {
    tabs: Tab[] = [{ 'tabName': 'Tab 1', 'tabIndex': 0, 'panelColumn': [] }];
}

export class MaskDetail {
    maskType = 'start';
    visibleTextSize = 4;
}

export class PanelColumns { // resultFields
    tableId: string;
    columnId: string;
    sequenceNo: string; // position
    schemaName: string;
    tableName: string;
    columnName: string;
    label: string;
    outputFunction = '';
    maskDetail = new MaskDetail();
    isMaskField = false; // maskfield
    sortingValue = 'Disable Sorting in this column'; // sorting
    isEnableFilter = false; //
    isHideColumn = false; // isHidden
    blob = false;
    encrypted = false;
    todecrypt = true;
}


export class PanelDetails {   // search result
    mainPanelDetails = new MainPanelDetails();
    inlinePanelDetails = new InlinePanelDetails();
    sidePanelDetails = new SidePanelDetails();
}

export class Adhoc {
    workspaceId: string;
    metadataVersion: string;
    appId: string;
    screenInfo = new ScreenInfo();
    panelDetails = new PanelDetails();
}

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
