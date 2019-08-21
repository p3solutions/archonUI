import { FilterConfigTree } from '../ert-landing-page/ert';
export class FilterConfigNode {
    id: number;
    operation: string;
    displayAND: boolean;
    displayOR: boolean;
    column: string;
    condition: string;
    value: string;
    children: FilterConfigNode[] = [];
    margin_left: number;
    parentId: number;
    dataType: string;

    constructor(id: number, operation: string, displayAND: boolean, displayOR: boolean, column: string,
        condition: string, value: string, margin_left: number, parentId: number, dataType: string, children: FilterConfigNode[]) {
        this.id = id;
        this.operation = operation;
        this.displayAND = displayAND;
        this.displayOR = displayOR;
        this.column = column;
        this.condition = condition;
        this.value = value;
        children = children;
        margin_left = margin_left;
        this.parentId = parentId;
        this.dataType = dataType;
    }
}

function filterNode(data) {
    this.id = data.id;
    this.operation = data.operation;
    this.displayAND = data.displayAND;
    this.displayOR = data.displayOR;
    this.column = data.column;
    this.condition = data.condition;
    this.value = data.value;
    this.parentId = data.parentId;
    this.dataType = data.dataType;
    this.children = [];
}

export function Tree() {
    this.root = null;
}

Tree.prototype.add = function (data, toNodeData) {
    const node = new filterNode(data);
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

export function searchTree(element, id: number) {
    if (element.id === id) {
        return element;
    } else if (element.children != null) {
        let i;
        let result = null;
        for (i = 0; result == null && i < element.children.length; i++) {
            result = searchTree(element.children[i], id);
        }
        return result;
    }
    return null;
}

Tree.prototype.remove = function (data) {
    if (this.root.id === data.id) {
        this.root = null;
    }
    const queue = [this.root];
    while (queue.length) {
        const node = queue.shift();
        if (node !== null) {
            for (let i = 0; i < node.children.length; i++) {
                if (node.children[i].id === data.id) {
                    node.children.splice(i, 1);
                } else {
                    queue.push(node.children[i]);
                }
            }
        } else {

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
        if (node.id === data.id) {
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
    const newline = new filterNode('|');
    const queue = [this.root, newline];
    let string = '';
    while (queue.length) {
        const node = queue.shift();
        string += node.id.toString() + ' ';
        if (node === newline && queue.length) {
            queue.push(newline);
        }
        for (let i = 0; i < node.children.length; i++) {
            queue.push(node.children[i]);
        }
    }
    // console.log(string.slice(0, -2).trim());
};
Tree.prototype.printByLevel = function () {
    if (!this.root) {
        return console.log('No root node found');
    }
    const newline = new filterNode('\n');
    const queue = [this.root, newline];
    let string = '';
    while (queue.length) {
        const node = queue.shift();
        string += node.id.toString() + (node.data !== '\n' ? ' ' : '');
        if (node === newline && queue.length) {
            queue.push(newline);
        }
        for (let i = 0; i < node.children.length; i++) {
            queue.push(node.children[i]);
        }
    }
    // console.log(string.trim());
};

export function addFilterNode(filterConfigTree: FilterConfigTree, parent: FilterConfigNode, child: FilterConfigNode): string {
    const filterTree = new Tree();
    if (filterConfigTree != null) {
        filterTree.root = filterConfigTree.root;
    }
    if (parent.id === 1 && child.id === 1) {
        filterTree.add(parent);
    } else {
        filterTree.add(child, parent);
    }
    return JSON.stringify(filterTree);
}


export function getPreorderDFS(filterTree: FilterConfigTree): any {
    const stack = [];
    const tempfilterTree = new Tree();
    tempfilterTree.root = filterTree.root;
    tempfilterTree.traverseDFS(function (node) {
        if (node.value === '') {
            stack.push(node.operation);
        } else if (node.value !== '') {
            stack.push(node.column + ' ' + node.condition + ' ' + node.value);
        }
    }, 'preOrder');
    return stack;
}

export function deleteNode(filterTree: FilterConfigTree, NodeToDelete: FilterConfigNode): FilterConfigTree {
    const tempfilterTree = new Tree();
    tempfilterTree.root = filterTree.root;
    tempfilterTree.remove(NodeToDelete);
    return tempfilterTree;
}


export class ColumnConfigFunction {
    function = '';
    inputType = '';
    outputType = '';
    dbName = '';
}

export function findParentNode(element, id: number) {
    if (element.id === id) {
        return element;
    } else if (element.children != null) {
        let i;
        let result = null;
        for (i = 0; result == null && i < element.children.length; i++) {
            result = searchTree(element.children[i], id);
        }
        return result;
    }
    return null;
}

export class FilterOperationList {
    operation = '';
    dataType = '';
}


