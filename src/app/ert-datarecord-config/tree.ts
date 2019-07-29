

function tableNode(data) {
  this.id = data.id;
  this.name = data.name;
  this.color = data.color;
  this.enableClick = data.enableClick;
  this.visible = data.visible;
  this.children = [];
}

function Tree() {
  this.root = null;
}

Tree.prototype.add = function (data, toNodeData) {
  const node = new tableNode(data);
  const parent = toNodeData ? this.findBFS(toNodeData) : null;
  if (parent) {
    parent.children.push(node);
  } else {
    if (!this.root) {
      this.root = node;
    } else {
      return 'Root node is already assigned';
    }
  }
};
Tree.prototype.remove = function (data) {
  if (this.root.name === data.name) {
    this.root = null;
  }

  const queue = [this.root];
  while (queue.length) {
    const node = queue.shift();
    for (let i = 0; i < node.children.length; i++) {
      if (node.children[i].name === data.name) {
        node.children.splice(i, 1);
      } else {
        queue.push(node.children[i]);
      }
    }
  }
};
Tree.prototype.contains = function (data) {
  return this.findBFS(data) ? true : false;
};
Tree.prototype.findBFS = function (data) {
  const queue = [this.root];
  while (queue.length) {
    const node = queue.shift();
    if (node.name === data.name) {
      return node;
    }
    for (let i = 0; i < node.children.length; i++) {
      queue.push(node.children[i]);
    }
  }
  return null;
};
Tree.prototype._preOrder = function (node, fn) {
  if (node) {
    if (fn) {
      fn(node);
    }
    for (let i = 0; i < node.children.length; i++) {
      this._preOrder(node.children[i], fn);
    }
  }
};
Tree.prototype._postOrder = function (node, fn) {
  if (node) {
    for (let i = 0; i < node.children.length; i++) {
      this._postOrder(node.children[i], fn);
    }
    if (fn) {
      fn(node);
    }
  }
};
Tree.prototype.traverseDFS = function (fn, method) {
  const current = this.root;
  if (method) {
    this['_' + method](current, fn);
  } else {
    this._preOrder(current, fn);
  }
};
Tree.prototype.traverseBFS = function (fn) {
  const queue = [this.root];
  while (queue.length) {
    const node = queue.shift();
    if (fn) {
      fn(node);
    }
    for (let i = 0; i < node.children.length; i++) {
      queue.push(node.children[i]);
    }
  }
};
Tree.prototype.print = function () {
  if (!this.root) {
    return console.log('No root node found');
  }
  const newline = new tableNode('|');
  const queue = [this.root, newline];
  let string = '';
  while (queue.length) {
    const node = queue.shift();
    string += node.name.toString() + ' ';
    if (node === newline && queue.length) {
      queue.push(newline);
    }
    for (let i = 0; i < node.children.length; i++) {
      queue.push(node.children[i]);
    }
  }
  console.log(string.slice(0, -2).trim());
};
Tree.prototype.printByLevel = function () {
  if (!this.root) {
    return console.log('No root node found');
  }
  const newline = new tableNode('\n');
  const queue = [this.root, newline];
  let string = '';
  while (queue.length) {
    const node = queue.shift();
    string += node.name.toString() + (node.name !== '\n' ? ' ' : '');
    if (node === newline && queue.length) {
      queue.push(newline);
    }
    for (let i = 0; i < node.children.length; i++) {
      queue.push(node.children[i]);
    }
  }
  console.log(string.trim());
};

class Prop {
  id: string;
  name: string;
  color: string;
  enableClick: boolean;
  visible: boolean;

  constructor(id: string, name: string, color: string, selected: boolean, visible?: boolean) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.enableClick = selected;
    this.visible = true;
  }

}
function getChildren(tableName: string, map): Prop[] {
  const tableList = [];
  let entireArray = [];
  let childArray = [];
  entireArray = map.get(tableName);
  for (const i of entireArray) {
    childArray = i.childTable;
  }
  for (const i of childArray) {
    tableList.push(new Prop(i.secondaryTableid, i.secondaryTableName, 'white', false));
  }
  return tableList;
}

function getTableProperty(tableName: string, map): Prop {
  let table: Prop;
  let entireArray;
  let childArray = [];
  let parentId, parentName;
  entireArray = map.get(tableName);
  for (const i of entireArray) {
    parentId = i.primaryTableId;
    parentName = i.primaryTableName;
    childArray = i.childTable;
  }
  if (tableName === parentName) {
    table = new Prop(parentId, parentName, 'white', false);
  } else {
    for (const i of childArray) {
      if (tableName === i.secondaryTableName) {
        table = new Prop(i.secondaryTableid, i.secondaryTableName, 'white', false);
      }
    }
  }
  return table;
}

//  nodeList ['ADDRESS', 'MEMBER', 'CLAIM', 'CLAIM_LIST']
//  eg1 : if  nodeName : 'CLAIM'    childName : 'CLAIM_LIST'  return value will be false
//  eg2 : if  nodeName : 'MEMBER'   childName : 'ADDRESS' return value will be true (Since ADDRESS is  parent of MEMBER)
//  eg3 : if  nodeName : 'CLAIM_LIST'    childName : 'ADDRESS'  return value will be true (Since ADDRESS is one of the parent in selected path)
function isAlreadyParent(nodeList, parentName, childName): boolean {
  let currentNodeIdx = -1;
  for (let i = 0; i < nodeList.length; i++) {
    if (nodeList[i].name === parentName) {
      currentNodeIdx = i;
    }
  }

  // Traverse till the parentName and see if child name is already one of the parent.
  for (let j = 0; j < currentNodeIdx; j++) {
    if (nodeList[j].name === childName) {
      return true;
    }
  }


  return false;
}

function isAldreadyChild(children, name): boolean {
  for (let i = 0; i < children.length; i++) {
    if (children[i].name === name) {
      return true;
    }
  }
  return false;
}

function addChildren(nodeList, parentNode, tableRelationshipDtls, isVisible) {
  console.log(parentNode);
  const childTableList: Prop[] = getChildren(parentNode.name, tableRelationshipDtls);

  for (let i = 0; childTableList[i]; i++) {
    if ((isAldreadyChild(parentNode.children, childTableList[i].name) === false) &&
      isAlreadyParent(nodeList, parentNode.name, childTableList[i].name) === false) {
      const node = new tableNode(childTableList[i]);
      node.visible = isVisible;
      parentNode.children.push(node);
    }
  }
}

//function getDataForGraph(inputTableList: string [], tableRelationshipDtls): string {
export function toJson(inputTableList: string[], tableRelationshipDtls): string {
  const tree = new Tree();
  let parent;
  let selectedTableList = [];

  // Insert selected paths in the tree First
  for (let i = 0; i < inputTableList.length; i++) {
    const table = getTableProperty(inputTableList[i], tableRelationshipDtls);

    if (i === 0) {
      table.color = '#F94B4C'; //Red for root node.
      table.enableClick = true;
      tree.add(table);
      parent = table; // This is the root table.
      selectedTableList.push(table);
      console.log("Root Table added" + parent.name);
    }
    else {
      table.color = 'black';
      table.enableClick = true;
      table.visible = true;
      tree.add(table, parent);
      selectedTableList.push(table);
      parent = table; // Current table becomes the parent for next insertion.
    }
  }

  // Travese Selected path and get the nodes for adding children
  // For Data record it is only linear traversal.
  let nodeList = [];
  for (let j = 0; j < selectedTableList.length; j++) {
    nodeList.push(tree.findBFS(selectedTableList[j]));
  }

  for (let k = 0; k < nodeList.length; k++) {
    let visible = (k === nodeList.length - 1) ? true : false;
    console.log("Node Length :" + nodeList.length + "K: " + k + "Visible :" + visible);
    addChildren(nodeList, nodeList[k], tableRelationshipDtls, visible);
  }
  //console.log(nodeList);
  let retVal = JSON.stringify(tree.root);
  console.log(retVal, 'from toJSON');
  // console.log(b);
  return retVal;
}

// ------- SIP Code -------//

function getChildTableListForSIP(inputTableList, tableName: string, map): Prop[] {
  const tableList = [];
  let entireArray = [];
  entireArray = map.get(tableName);

  for (const i of entireArray[0].childTable) {
    tableList.push(new Prop(i.secondaryTableid, i.secondaryTableName, 'white', false));
  }

  return tableList;
}

function isPathForSIP(inputTableList: string[], tableName: string, parent: string): boolean {
  for (let i = 0; i < inputTableList.length; i++) {
    if ((tableName === inputTableList[i])) {
      return true;
    }
  }
  return false;
}

export function getSIPGraphData(inputTableList: string[], map) {
  const tree = new Tree();

  for (let i = 0; i < inputTableList.length; i++) {
    const parent = getTableProperty(inputTableList[i], map);

    if (i === 0) {
      // parent.isSelected = isSelectedPath(inputTableList,parent.tableName);
      parent.color = '#F94B4C';
      parent.enableClick = true;
      tree.add(parent);
    }

    const childTableList: Prop[] = getChildTableListForSIP(inputTableList, parent.name, map);
    for (let j = 0; j < childTableList.length; j++) {
      if (isPathForSIP(inputTableList, childTableList[j].name, parent.name)) {
        childTableList[j].color = 'black';
        childTableList[j].enableClick = true;
      }

      if (childTableList[j].color === 'black') {
        if (tree.contains(childTableList[j]) === true) {
          childTableList[j].color = '#e0e0e0';
          // added by Satheesh
          childTableList[j].enableClick = false;
        }
      }
      tree.add(childTableList[j], parent);
    }

  }
  return JSON.stringify(tree.root);
}


// Following set of functions is used to construct the selected nodes - Parent/Children for sip.
export function getRelationshipListForSip(root) {
  const tablelist = [];
  findSelectedNodes(root, tablelist);
  return tablelist;
}

function notInList(tableName, tablelist): boolean {
  if (tablelist === null) {
    return true;
  }
  for (let i = 0; i < tablelist.length; i++) {
    if (tableName === tablelist[i].name) {
      return false; // Exists in list so we are saying false.
    }
  }
  return true;
}

function getTable(tableName, tablelist) {
  for (let i = 0; i < tablelist.length; i++) {
    if (tableName === tablelist[i].name) {
      return tablelist[i];
    }
  }
  return null;
}


function tableDtls(id, name, children) {
  this.id = id;
  this.name = name;
  this.children = [];
}

function childDtls(id, name) {
  this.id = id;
  this.name = name;
}

function findSelectedNodes(node, tablelist) {
  const black = 'black';
  const grey = '#e0e0e0';

  if (node === null) {
    return null;
  }

  let tableNodes;
  if (notInList(node.name, tablelist)) {
    tableNodes = new tableDtls(node.id, node.name, []);
    tablelist.push(tableNodes);
  } else {
    tableNodes = getTable(node.name, tablelist)
  }
  // Add first level childrens
  for (let i = 0; i < node.children.length; i++) {
    if ((node.children[i].color === black) || (node.children[i].color === grey)) {
      const child = new childDtls(node.children[i].id, node.children[i].name);
      tableNodes.children.push(child);
      findSelectedNodes(node.children[i], tablelist);
    }
  }
}

function addChildrenForERTSummaryPage(nodeList, parentNode, tableRelationshipDtls, isVisible) {
  console.log(parentNode);
  const childTableList: Prop[] = getChildren(parentNode.name, tableRelationshipDtls);

  for (let i = 0; childTableList[i]; i++) {
    if ((isAldreadyChild(parentNode.children, childTableList[i].name) === false) &&
      isAlreadyParent(nodeList, parentNode.name, childTableList[i].name) === false) {
      const node = new tableNode(childTableList[i]);
      node.visible = isVisible;
      if (node.color !== 'white') {
        parentNode.children.push(node);
      }
    }
  }
}

export function getERTSummaryPageGraphDataRecord(inputTableList: string[], tableRelationshipDtls): string {
  const tree = new Tree();
  let parent;
  const selectedTableList = [];

  console.log('....I am in toJson...');
  // Insert selected paths in the tree First
  for (let i = 0; i < inputTableList.length; i++) {
    const table = getTableProperty(inputTableList[i], tableRelationshipDtls);

    if (i === 0) {
      table.color = '#F94B4C'; // Red for root node.
      table.enableClick = true;
      tree.add(table);
      parent = table; // This is the root table.
      selectedTableList.push(table);
      console.log('Root Table added' + parent.name);
    } else {
      table.color = 'black';
      table.enableClick = true;
      table.visible = true;
      tree.add(table, parent);
      selectedTableList.push(table);
      parent = table; // Current table becomes the parent for next insertion.
    }
  }

  // Travese Selected path and get the nodes for adding children
  // For Data record it is only linear traversal.
  const nodeList = [];
  for (let j = 0; j < selectedTableList.length; j++) {
    nodeList.push(tree.findBFS(selectedTableList[j]));
  }

  for (let k = 0; k < nodeList.length; k++) {
    const visible = (k === nodeList.length - 1) ? true : false;
    console.log('Node Length :' + nodeList.length + 'K: ' + k + 'Visible :' + visible);
    addChildrenForERTSummaryPage(nodeList, nodeList[k], tableRelationshipDtls, visible);
  }
  // console.log(nodeList);
  // console.log(b);
  return tree.root;
}

export function getERTSummaryPageSIPGraphData(inputTableList: string[], map) {
  const tree = new Tree();

 for (let i = 0; i < inputTableList.length; i++) {
    const parent = getTableProperty(inputTableList[i], map);

    if (i === 0) {
      // parent.isSelected = isSelectedPath(inputTableList,parent.tableName);
      parent.color = '#F94B4C';
      parent.enableClick = true;
      tree.add(parent);
    }

    const childTableList: Prop[] = getChildTableListForSIP(inputTableList, parent.name, map);
    for (let j = 0; j < childTableList.length; j++) {
      if (isPathForSIP(inputTableList, childTableList[j].name, parent.name)) {
        childTableList[j].color = 'black';
        childTableList[j].enableClick = true;
      }

    if (childTableList[j].color === 'black') {
        if (tree.contains(childTableList[j]) === true) {
          childTableList[j].color = '#e0e0e0';
          // added by Satheesh
          childTableList[j].enableClick = false;
        }
      }
      if ((childTableList[j].color !== 'white')) {
      tree.add(childTableList[j], parent);
      }
    }

  }
  return tree.root;
}

