export class StoredProcView {

}


export class SelectedTableNameListObj{
tableId:string='';
tableName:string='';
}

export class TableNameAndRelatingTable{
    workspaceId:string='';
    tableId:string='';
    tableName:string='';
    spvInfo:SpvInfo=new SpvInfo();
}

export class SpvInfo{
    type:string='';
    name:string='';
    relatingTableList:RelatingTableList[]=[];
}

export class RelatingTableList{
    tableId:string='';
    tableName:string='';
    joinInfoList:JoinInfoList[]=[];
}

export class JoinInfoList{
    primaryColumn:{columnId:string,columnName:string,dataType:string}={columnId:'',columnName:'',dataType:''};
    secondaryColumn:{columnId:string,columnName:string,dataType:string}={columnId:'',columnName:'',dataType:''};
}

export class spvNameList{
    workspaceId:string='';
    tableId:string='';
    tableName:string='';
    spvInfoList:{type:string,name:string}[]=[];
}
