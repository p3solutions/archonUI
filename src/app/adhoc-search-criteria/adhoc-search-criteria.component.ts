import { Component, OnInit, ViewChild } from '@angular/core';
import { TableColumnNode, SearchColumn } from '../adhoc-landing-page/adhoc';
import { NestedTreeControl, FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BehaviorSubject } from 'rxjs';
import { AdhocScreenService } from './adhoc-screen.service';
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-adhoc-search-criteria',
  templateUrl: './adhoc-search-criteria.component.html',
  styleUrls: ['./adhoc-search-criteria.component.css']
})
export class AdhocSearchCriteriaComponent implements OnInit {

  TREE_DATA: TableColumnNode[] = [
    {
      id: '1',
      type: 'Table',
      name: 'Address',
      columns: [
        {
          id: '1',
          type: 'Column', name: 'Address 1'
        },
        {
          id: '2',
          type: 'Column', name: 'Address 2'
        },
        {
          id: '3',
          type: 'Column', name: 'Address 3'
        },
      ]
    },
    {
      id: '1',
      type: 'Table',
      name: 'Claim',
      columns: [
        {
          id: '1',
          type: 'Column', name: 'Claim 1'
        },
        {
          id: '2',
          type: 'Column', name: 'Claim 2'
        },
        {
          id: '3',
          type: 'Column', name: 'Claim 3'
        },
      ]
    },
    {
      id: '1',
      type: 'Table',
      name: 'Member',
      columns: [
        {
          id: '1',
          type: 'Column', name: 'Member'
        },
        {
          id: '2',
          type: 'Column', name: 'Member'
        },
        {
          id: '3',
          type: 'Column', name: 'Member'
        },
      ]
    }
  ];
  private transformer = (node: TableColumnNode, level: number) => {
    return {
      expandable: !!node.columns && node.columns.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.columns);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  data = this.TREE_DATA;

  dataChange = new BehaviorSubject<TableColumnNode[]>([]);

  constructor(private router: Router, private adhocScreenService: AdhocScreenService) {
    this.dataSource.data = this.TREE_DATA;
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  ngOnInit() {
    this.router.navigate(['/workspace/adhoc/screen/search/column']);
  }
  searchColumn: SearchColumn[] = [];
  @ViewChild('tree') tree;
  trackByFn(index, item) {
    return index;
  }
  ngAfterViewInit() {
  }
  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    this.TREE_DATA.filter(a => a.name === 'Address')[0].columns.shift();
    this.dataSource.data = this.TREE_DATA;
    this.adhocScreenService.updatedSearchColumns.subscribe(result => {
      this.searchColumn = result;
    });
    const tempSearchColumn = new SearchColumn();
    tempSearchColumn.columnName = event.item.data;
    tempSearchColumn.tableName = 'Address';
    tempSearchColumn.label = event.item.data;
    this.searchColumn.push(tempSearchColumn);
    this.adhocScreenService.updateSearchColumns(this.searchColumn);
    this.treeControl.expand(this.treeControl.dataNodes.find(a => a.name === 'Address'));
  }
}
