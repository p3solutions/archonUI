export function response(data) {
 const responseArray = [];
 let Obj;
 for (const i of data) {
     for (const j of i.joinList) {
        const ArrObj = {
            relationshipId : i.relationshipId,
            primaryColumn: {
                columnId: j.pkColumnId,
                columnName: j.pkColumn
              },
            secondaryColumn: {
                columnId: j.fkColumnId,
                columnName: j.fkColumn
              }
        };
    const JoinList = [];
    JoinList.push(ArrObj);
        Obj = {
            joinName : i.joinName ,
            primaryTable : {
                   tableId : j.pkTableId,
                   tableName: j.pkTable
            },
            secondaryTable : {
                tableId : j.fkTableId,
                tableName: j.fkTable
              },
              joinListInfo: JoinList
         };
        }
        responseArray.push(Obj);
    }
    return responseArray;
}
