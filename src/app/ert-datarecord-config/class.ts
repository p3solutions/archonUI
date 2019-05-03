export function CompleteArray(primaryTableId, primaryTableName, secondaryTableArray) {
    const TableList = [];
    const obj = {
        'primaryTableId' : primaryTableId,
        'primaryTableName' : primaryTableName,
        'childTable' : secondaryTableArray
    };
    TableList.push(obj);
    return TableList;
}

export function getSecondaryArray(data) {
    let secondaryTableArray = [];
    for (const i of data) {
        const secondaryTable = {
          'secondaryTableid': i.secondaryTable.tableId,
          'secondaryTableName': i.secondaryTable.tableName
          };
          secondaryTableArray.push(secondaryTable);
    }
    secondaryTableArray = secondaryTableArray.filter((thing, index, sel) =>
    index === sel.findIndex((t) => (
      t.secondaryTableid === thing.secondaryTableid && t.secondaryTableName === thing.secondaryTableName
    )));
    return secondaryTableArray;
  }

  export function getPrimaryArray(data) {
    let x = 0;
    const primaryTableArray = [];
    for (const i of data) {
      const primaryTable = {
        'primaryTableId' : i.primaryTable.tableId,
        'primaryTableName' : i.primaryTable.tableName
      };
      if (x === 0) {primaryTableArray.push(primaryTable); x = 1; }
    }
    return primaryTableArray;
}
