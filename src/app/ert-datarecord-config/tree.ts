function tableNode(data) {
      this.id = data.id;
      this.name = data.name;
      this.color = data.color;
      this.enableClick = data.enableClick;
      this.children = [];
    }

    function Tree() {
      this.root = null;
    }

    Tree.prototype.add = function(data, toNodeData) {
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
    Tree.prototype.remove = function(data) {
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
    Tree.prototype.contains = function(data) {
      return this.findBFS(data) ? true : false;
    };
    Tree.prototype.findBFS = function(data) {
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
    Tree.prototype._preOrder = function(node, fn) {
      if (node) {
        if (fn) {
          fn(node);
        }
        for (let i = 0; i < node.children.length; i++) {
          this._preOrder(node.children[i], fn);
        }
      }
    };
    Tree.prototype._postOrder = function(node, fn) {
      if (node) {
        for (let i = 0; i < node.children.length; i++) {
          this._postOrder(node.children[i], fn);
        }
        if (fn) {
          fn(node);
        }
      }
    };
    Tree.prototype.traverseDFS = function(fn, method) {
      const current = this.root;
      if (method) {
        this['_' + method](current, fn);
      } else {
        this._preOrder(current, fn);
      }
    };
    Tree.prototype.traverseBFS = function(fn) {
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
    Tree.prototype.print = function() {
      if (!this.root) {
        return console.log('No root node found');
      }
      const newline = new tableNode('|');
      const  queue = [this.root, newline];
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
    Tree.prototype.printByLevel = function() {
      if (!this.root) {
        return console.log('No root node found');
      }
      const  newline = new tableNode('\n');
      const  queue = [this.root, newline];
      let string = '';
      while (queue.length) {
        const  node = queue.shift();
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

      constructor(id: string, name: string, color: string, selected: boolean) {
          this.id = id;
          this.name = name;
          this.color = color;
          this.enableClick = selected;
      }

    }
  function isToAdd(inputTableList, primarytableName, secondaryTableName): boolean {
     const childArray = [];
     let retVal = true;

     for ( const i of inputTableList) {
       if (i !== primarytableName ) {
         childArray.push(i);
       } else if (i === primarytableName) {
         break;
       }
     }
     if ( childArray != null) {
        for ( const j of childArray) {
          if (j === secondaryTableName) {
            retVal = false;
          }
        }

     }
    return retVal;
  }

  function getChildTableList(inputTableList ,tableName: string, map): Prop[] {
    const  tableList = [];
    let entireArray = [];
    let childArray = [];
    entireArray = map.get(tableName);
    for (const i of entireArray) {
      childArray = i.childTable;
    }
    for (const i of childArray) {
      if (isToAdd(inputTableList, tableName, i.secondaryTableName)) {
      tableList.push(new Prop(i.secondaryTableid, i.secondaryTableName, 'white', false));
      }
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

  function isSelectedPath(inputTableList: string[], tableName: string, parent: string): boolean {
      for (let i = 0; i < inputTableList.length; i++) {
          if ((tableName === inputTableList[i]) && (parent === inputTableList[i-1]) ) {
              return true;
          }
      }
      return false;
  }

  function isPath(inputTableList: string[], tableName: string, parent: string): boolean {
    for (let i = 0; i < inputTableList.length; i++) {
      if ((tableName === inputTableList[i]) && (parent === inputTableList[i-1])) {
          return true;
      }
    }
  return false;
  }

 export function toJson(inputTableList: string [], map) {
      const tree = new Tree();
      const toggleTable = inputTableList[inputTableList.length - 1]; // Last table is selected table.

      for (let i = 0; i < inputTableList.length; i++) {
          const parent = getTableProperty(inputTableList[i], map);

          if (i === 0) {
             // parent.isSelected = isSelectedPath(inputTableList,parent.tableName);
              parent.color = '#F94B4C';
               // Set the selected flag for last table in the input table list
              if (toggleTable === parent.name) {
                parent.enableClick = true; // isSelectedPath(inputTableList, parent.name);
              }
              tree.add(parent);
          }

          const childTableList: Prop [] = getChildTableList(inputTableList, parent.name, map);
          for ( let j = 0; j < childTableList.length; j++) {

            // Set the selected flag for last table in the input table list
            if (toggleTable === childTableList[j].name) {
              childTableList[j].enableClick = isSelectedPath(inputTableList, childTableList[j].name, parent.name);
            }

            if (isPath(inputTableList, childTableList[j].name, parent.name)) {
              childTableList[j].color = 'black';
            }
            tree.add(childTableList[j], parent);
          }

        }
      return JSON.stringify(tree.root);
     }

     // ------- SIP Code -------//

     function getChildTableListForSIP(inputTableList ,tableName: string, map): Prop[] {
      const  tableList = [];
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

     export function getSIPGraphData(inputTableList: string [], map) {
      const tree = new Tree();

      for (let i = 0; i < inputTableList.length; i++) {
          const parent = getTableProperty(inputTableList[i], map);

          if (i === 0) {
             // parent.isSelected = isSelectedPath(inputTableList,parent.tableName);
              parent.color = '#F94B4C';
              parent.enableClick = true;
              tree.add(parent);
          }

          const childTableList: Prop [] = getChildTableListForSIP(inputTableList, parent.name, map);
          for ( let j = 0; j < childTableList.length; j++) {
           if (isPathForSIP(inputTableList, childTableList[j].name, parent.name)) {
              childTableList[j].color = 'black';
              childTableList[j].enableClick = true;
            }

            if (childTableList[j].color === 'black') {
              if (tree.contains(childTableList[j]) === true) {
                childTableList[j].color = 'blue';
              }
            }
            tree.add(childTableList[j], parent);
          }

        }
      return JSON.stringify(tree.root);
     }
