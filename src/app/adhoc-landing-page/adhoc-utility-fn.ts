import { InputFunctionsInfo, Option, SearchTypesByfieldType } from './adhoc';
import { FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
export const inputFunctionList: InputFunctionsInfo[] = [{
    'sequenceNo': 0,
    'functionName': 'Gender Description Common', 'functionDesc': 'Converts gender acronym into its description values.'
    , 'text': `declare function local:genderDesc1($field){
    if($field = 'M') then 'Male'
    else if($field = 'm') then 'Male'
    else if($field = 'F') then 'Female'
    else if($field = 'f') then 'Female'
    else if($field = 'U') then 'Unknown'
    else if($field = 'u') then 'Unknown' else 'Unknown'
    }`, 'input': ['M', 'm', 'F', 'f', 'U', 'u'], 'output': ['Male', 'Male', 'Female', 'Female', 'Unknown', 'Unknown']
},
{
    'sequenceNo': 1,
    'functionName': 'Gender Description to acronym', 'functionDesc': 'Converts gender description to its acronym.'
    , 'text': `declare function local:genderDesc2($field){
      if(lower-case($field) = 'male') then 'M'
      else if(lower-case($field) = 'female') then 'F'
      else 'U'
    };`, 'input': ['Male', 'male', 'Female', 'female', 'Unknown', 'unknown'], 'output': ['M', 'm', 'F', 'f', 'U', 'u']
},
{
    'sequenceNo': 2,
    'functionName': 'Date From YYYY-MM-DD to MM-DD-YYYY', 'functionDesc': 'Convert Date from yyyy-mm-dd to mm-dd-yyyy'
    , 'text': `declare function local:dateymd2mdy($field){
      if($field = '')
      then ''
      else
        concat(substring($field,6),'-',substring($field,1,4))
    };`, 'input': ['2018-01-01', '1970-12-31'], 'output': ['01-01-2018', '12-31-1970']
},
{
    'sequenceNo': 3,
    'functionName': 'Date From YYYY-MM-DD to YYYYMMDD', 'functionDesc': 'Convert Date from yyyy-mm-dd to yyyymmdd'
    , 'text': `declare function local:dateyyyymmdd($field){
      if($field = '')
      then ''
      else
        concat(substring($field,1,4),substring($field,6,2),substring($field,9,2))
    };`, 'input': ['2018-01-01', '1970-12-31'], 'output': ['20180101', '19701231']
},
{
    'sequenceNo': 4,
    'functionName': 'Date From YYYYMMDD To MM-DD-YYYY', 'functionDesc': 'Convert Date from yyyymmdd to mm-dd-yyyy '
    , 'text': `declare function local:date_mm_dd_yyyy($field){
      if($field = '')
      then ''
      else
        concat(substring($field,5,2),'-',substring($field,7,2),'-',substring($field,1,4))
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
        if (control1.value === 'DATE') {
            control.setErrors(null);
        } else if (control1.value === 'TEXT') {
            control.setErrors(null);
        } else {
            const tempOptions = control.value.split(/[\r\n]+/g);
            for (const option of tempOptions) {
                tempOption = option.split(',');
                if (tempOption[0] !== undefined && tempOption[1] !== undefined) {
                    if (tempOption[0].length === 0 && tempOption[1].length === 0) {
                        optionArray.push({ 'label': ' ', 'value': ' ' });
                    } else if (tempOption[0] !== '' && tempOption[1].length === 0) {
                        optionArray.push({ 'label': tempOption[0], 'value': ' ' });
                        control.setErrors(null);
                    } else if (tempOption[0].length === 0 && tempOption[1] !== '') {
                        optionArray.push({ 'label': ' ', 'value': tempOption[1] });
                        control.setErrors(null);
                    } else if (tempOption[0] !== '' && tempOption[1] !== '') {
                        optionArray.push({ 'label': tempOption[0], 'value': tempOption[1] });
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
export function getUserId(): string {
    const jwtHelper: JwtHelperService = new JwtHelperService();
    const userId = sessionStorage.getItem('userId');
    const accessToken = localStorage.getItem(userId);
    const token_data = jwtHelper.decodeToken(accessToken);
    return token_data.user.id;
}

export const searchTypes: SearchTypesByfieldType[] = [{
    'fieldType': 'TEXT',
    'searchTypes': ['=', 'Starts with', 'Ends with', 'Wild', '<', '< =', '>', '> =', 'Between', 'Between and Inclusion']
},
{
    'fieldType': 'DATE',
    'searchTypes': ['=', '<', '< =', '>', '> =', 'Date Range']
},
{
    'fieldType': 'COMBO',
    'searchTypes': ['=', 'Starts with', 'Ends with', 'Wild', '<', '< =', '>', '> =']
},
{
    'fieldType': 'RADIO',
    'searchTypes': ['=']
},
{
    'fieldType': 'CHECK',
    'searchTypes': ['=']
}]
