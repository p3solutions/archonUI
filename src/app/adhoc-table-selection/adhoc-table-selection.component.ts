import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TableListService } from '../table-list/table-list.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import * as d3 from 'd3';
import { toJson } from '../ert-datarecord-config/tree';
import { CompleteArray, getPrimaryArray, getSecondaryArray } from '../ert-datarecord-config/class';
import { AdhocSavedObjectService } from '../adhoc-header/adhoc-saved-object.service';
import {
  GraphDetails, Adhoc, LinearTableMapOrder,
  SearchResult, SearchCriteria, Tab, ResultFields, AdhocHeaderInfo
} from '../adhoc-landing-page/adhoc';
import { AdhocScreenService } from '../adhoc-search-criteria/adhoc-screen.service';
import { ErtService } from '../ert-landing-page/ert.service';
import { AdhocService } from '../adhoc-landing-page/adhoc.service';
import { TableSelectionService } from './table-selection.service';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-adhoc-table-selection',
  templateUrl: './adhoc-table-selection.component.html',
  styleUrls: ['./adhoc-table-selection.component.css']
})
export class AdhocTableSelectionComponent implements OnInit {

  includesArray = [];
  workspaceID: any;
  tableList = [];
  relationshipInfo = [];
  selectedValues: string[] = [];
  primaryTable = [];
  secondaryTable = [];
  joinListMap = new Map();
  data;
  schemaResultsTableCount = 0;
  selectedPrimaryTable;
  screenInfoObject = new Adhoc();
  graphDetails = new GraphDetails();
  linearTableMapOrder: LinearTableMapOrder[] = [];
  tempValue = '';
  startIndex = 1;
  searchTableName = '';
  emptyNested = true;
  page = 1;
  primarytableIdWhenNoRelation = '';
  tempObj: { tableId: string, tableName: string, databaseName: string } = { tableId: '', tableName: '', databaseName: '' };

  constructor(public router: Router, private tablelistService: TableListService, private cookieService: CookieService,
    private workspaceHeaderService: WorkspaceHeaderService, public activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService,
    private adhocSavedObjectService: AdhocSavedObjectService, private adhocScreenService: AdhocScreenService,
    private tableService: TableSelectionService, private adhocService: AdhocService) { }

  ngOnInit() {
    try {
      const tempTables: { tableId: string, tableName: string, databaseName: string }[] = [];
      this.workspaceID = this.cookieService.get('workspaceId');
      this.spinner.show();
      this.deleteSearchResult('');
      this.screenInfoObject = this.adhocSavedObjectService.screenInfoObject;
      if (this.screenInfoObject.sessionAdhocModel.selectedTableListString !== '') { // For Nested Screen.
        const tempTableList = JSON.parse(this.screenInfoObject.sessionAdhocModel.selectedTableListString);
        for (const item of tempTableList) {
          tempTables.push({ 'tableId': item.tableId, 'tableName': item.tableName, 'databaseName': item.schemaName });
        }
        this.tableList = tempTables;
        this.checkForSingleTable();
        this.schemaResultsTableCount = this.tableList.length;
        for (const i of this.tableList) {
          this.includesArray.push(i.tableName);
        }
        this.spinner.hide();
      } else { // For Parent Screen.
        this.tablelistService.getTableList(this.workspaceID, this.startIndex).subscribe((res: any) => {
          this.tableList = res.tableList;
          if (res.paginationRequired) {
            this.schemaResultsTableCount = (this.startIndex + 1) * 50;
          }
          this.checkForSingleTable();
          this.spinner.hide();
        });
      }
      if (this.screenInfoObject.sessionAdhocModel.graphDetails.data !== '') {
        this.data = JSON.parse(this.screenInfoObject.sessionAdhocModel.graphDetails.data.replace(/'/g, '"'));
        this.selectedValues = JSON.parse(this.screenInfoObject.sessionAdhocModel.graphDetails.selectedValues.replace(/'/g, '"'));
        this.joinListMap = new Map(JSON.parse(this.screenInfoObject.sessionAdhocModel.graphDetails.joinListMap.replace(/'/g, '"')));
        this.selectedPrimaryTable = JSON.parse(this.screenInfoObject.
          sessionAdhocModel.graphDetails.selectedPrimaryTable.replace(/'/g, '"'));
        this.createchart();
      }
    } catch {
      this.spinner.hide();
    }
  }

  checkForSingleTable() {
    try {
      if (this.screenInfoObject.sessionAdhocModel.graphDetails.data !== '') {
        this.selectedValues = JSON.parse(this.screenInfoObject.sessionAdhocModel.graphDetails.selectedValues.replace(/'/g, '"'));
        this.selectedPrimaryTable = JSON.parse(this.screenInfoObject.
          sessionAdhocModel.graphDetails.selectedPrimaryTable.replace(/'/g, '"'));
        if (this.selectedValues.length === 0) {
          const temp = this.tableList.filter(a => a.tableName === this.selectedPrimaryTable)[0];
          if (temp !== undefined) {
            this.primarytableIdWhenNoRelation = temp.tableId;
          }
        }
      }
    } catch{
      this.spinner.hide();
    };
  }
  gotoDataRecFinal() {
    const graphDetails = new GraphDetails();
    graphDetails.data = JSON.stringify(this.data).replace(/"/g, '\'');
    graphDetails.selectedValues = JSON.stringify(this.selectedValues).replace(/"/g, '\'');
    graphDetails.selectedPrimaryTable = JSON.stringify(this.selectedPrimaryTable).replace(/"/g, '\'');
    graphDetails.joinListMap = JSON.stringify(Array.from(this.joinListMap.entries())).replace(/"/g, '\'');
    this.screenInfoObject.sessionAdhocModel.graphDetails = graphDetails;
    this.linearTableMapOrder = this.createLinearTableMapOrder(this.selectedValues, this.joinListMap);
    this.screenInfoObject.sessionAdhocModel.linearTableMapOrder = this.linearTableMapOrder;
    this.adhocSavedObjectService.setScreenInfoObject(this.screenInfoObject);
    this.adhocSavedObjectService.setPrimarytableIdWhenNoRelation(this.primarytableIdWhenNoRelation);
    this.router.navigate(['/workspace/adhoc/screen/search-criteria']);
  }

  searchTablelist() {
    this.tableList = [];
    this.adhocService.getTablesearchList(this.workspaceID,
      this.searchTableName.toLocaleUpperCase(), this.startIndex).subscribe((res: any) => {
        this.tableList = res.tableList;
        if (res.paginationRequired) {
          this.schemaResultsTableCount = (this.startIndex + 1) * 50;
        } else {
          this.schemaResultsTableCount = 0;
        }
      });
  }

  getPage(page: number) {
    if (this.searchTableName !== '') {
      this.startIndex = page;
      this.searchTablelist();
      this.checkForSingleTable();
    } else {
      this.tableList = [];
      this.startIndex = page;
      this.tablelistService.getTableList(this.workspaceID, this.startIndex).subscribe((res: any) => {
        this.tableList = res.tableList;
        this.checkForSingleTable();
        if (res.paginationRequired) {
          this.schemaResultsTableCount = (this.startIndex + 1) * 50;
        }
      });
    }
  }

  createLinearTableMapOrder(selectedValues: string[] = [], joinListMap = new Map): LinearTableMapOrder[] {
    const tableNames = selectedValues;
    const linearTableMapOrder: LinearTableMapOrder[] = [];
    if (tableNames.length !== 0) {
      for (let i = 0; i < tableNames.length; i++) {
        const tableId = joinListMap.get(tableNames[i])[0].primaryTableId;
        linearTableMapOrder.push({ 'ordinal': i + 1, 'tableId': tableId, 'tableName': tableNames[i] });
      }
    } else {
      linearTableMapOrder.push({ 'ordinal': 1, 'tableId': this.primarytableIdWhenNoRelation, 'tableName': this.selectedPrimaryTable });
    }
    return linearTableMapOrder;
  }

  gotoScreenApp() {
    this.router.navigate(['/workspace/adhoc/app-screen-list']);
  }

  populategraph(value, event) {
    this.emptyNested = true;
    let tempHeader = new AdhocHeaderInfo();
    this.adhocService.updatedAdhocHeaderInfo.subscribe(response => {
      tempHeader = response;
    });
    this.tempValue = event.target.value;
    if (this.screenInfoObject.sessionAdhocModel.graphDetails.selectedPrimaryTable !== '') {
      document.getElementById('success-popup-btn').click();
    } else {
      this.selectedPrimaryTable = event.target.value;
      d3.select('svg').remove();
      this.selectedValues = [];
      this.relationshipInfo = [];
      this.tablelistService.getListOfRelationTableMMR(this.workspaceID,
        tempHeader.appMetadataVersion, value.tableName).subscribe(result => {
          if (result.length !== 0) {
            if (this.tableService.booleanNested) {
              for (const i of result) {
                if (this.includesArray.includes(i.secondaryTable.tableName)) {
                  this.relationshipInfo.push(i);
                }
              }
              if (this.relationshipInfo.length === 0) {
              this.emptyNested = false;
              }
            } else {
              this.relationshipInfo = result;
            }
            if (this.emptyNested) {
              this.primaryTable = getPrimaryArray(this.relationshipInfo);
              this.secondaryTable = getSecondaryArray(this.relationshipInfo);
              for (const i of this.primaryTable) {
                this.joinListMap.set(i.primaryTableName, CompleteArray(i.primaryTableId, i.primaryTableName, this.secondaryTable));
              }
              this.selectedValues.push(value.tableName);
              this.data = JSON.parse(toJson(this.selectedValues, this.joinListMap));
              this.createchart();
            } else {
              this.primarytableIdWhenNoRelation = this.tableList.filter(a => a.tableName === this.selectedPrimaryTable)[0].tableId;
              this.relationshipInfo = result;
              this.data = {
              color: '#ffffff',
              enableClick: false,
              id: 'NoRelation',
              name: value.tableName,
              visible: true,
              };
            this.createchart();
            }
          } else {
            this.primarytableIdWhenNoRelation = this.tableList.filter(a => a.tableName === this.selectedPrimaryTable)[0].tableId;
            this.relationshipInfo = result;
            this.data = {
              color: '#ffffff',
              enableClick: false,
              id: 'NoRelation',
              name: value.tableName,
              visible: true,
            };
            this.createchart();
          }
        });
    }
  }

  deleteSearchResult(value: string) {
    this.adhocScreenService.updateSearchCriteria([]);
    this.adhocScreenService.updateSearchResult(new SearchResult());
    this.adhocScreenService.updateSearchCriterion(new SearchCriteria());
    this.adhocScreenService.updateInlinePanelTabChange(new Tab());
    this.adhocScreenService.updateSidePanelTabChange(new Tab());
    this.adhocScreenService.updateResultField(new ResultFields());
    this.adhocScreenService.updatePanelChanged(0);
    this.screenInfoObject.sessionAdhocModel.searchCriteria = [];
    this.screenInfoObject.sessionAdhocModel.searchResult.mainPanel = [];
    this.screenInfoObject.sessionAdhocModel.searchResult.sidePanel = null;
    this.screenInfoObject.sessionAdhocModel.searchResult.inLinePanel = null;
    this.screenInfoObject.sessionAdhocModel.graphDetails.selectedPrimaryTable = '';
    this.primarytableIdWhenNoRelation = '';
    if (value === 'html') {
      document.getElementById(this.tempValue).click();
    }
  }

  cancelSearchResult() {
    document.getElementById(JSON.parse(this.screenInfoObject.sessionAdhocModel.graphDetails.selectedPrimaryTable.replace(/'/g, '"')))
      .click();
    this.data = JSON.parse(this.screenInfoObject.sessionAdhocModel.graphDetails.data.replace(/'/g, '"'));
    this.selectedValues = JSON.parse(this.screenInfoObject.sessionAdhocModel.graphDetails.selectedValues.replace(/'/g, '"'));
    this.joinListMap = new Map(JSON.parse(this.screenInfoObject.sessionAdhocModel.graphDetails.joinListMap.replace(/'/g, '"')));
    this.selectedPrimaryTable = JSON.parse(this.screenInfoObject.sessionAdhocModel.graphDetails.selectedPrimaryTable.replace(/'/g, '"'));
    this.createchart();
  }

  createchart() {
    // push the parent node
    const width = 1000,
      height = 1000;

    let i = 0;

    // const root = d3.hierarchy(this.data);
    const transform = d3.zoomIdentity;
    let node, link;

    // tslint:disable-next-line: max-line-length
    const svg = d3.select('body app-root app-workspace-landing-page app-adhoc-header .container-fluid app-adhoc-table-selection #ert-table-id .entry-card .col-md-9 .card')
      .append('svg')
      .call(d3.zoom().scaleExtent([1 / 2, 8]).on('zoom', zoomed))
      .append('g')
      .attr('transform', 'translate(40,0)');

    // tslint:disable-next-line: max-line-length
    const div = d3.select('body app-root app-workspace-landing-page app-adhoc-header .container-fluid app-adhoc-table-selection #ert-table-id .entry-card .col-md-9 .card').append('div')
      .attr('class', 'tooltipd3')
      .style('opacity', 0);

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(function (d: any) { return d.id; }).distance(100).strength(1)) // distance & strength added
      .force('charge', d3.forceManyBody().distanceMax(300).strength(-1000)) // added min, stength default:-15
      .force('center', d3.forceCenter(width / 2, height / 4))
      .on('tick', ticked);


    // update starts
    function update(data) {
      const root = d3.hierarchy(data);
      const nodes = flatten(root);
      const links = root.links();
      link = svg
        .selectAll('.link')
        .data(links, function (d: any) { return d.target.id; });
      link.exit().remove();
      const linkEnter = link
        .enter()
        .append('line')
        .attr('class', 'link')
        .style('stroke', '#000')
        .style('opacity', '0.2')
        .style('visibility', function (d) { if (d.target.data.visible === false) { return 'hidden'; } })
        .style('stroke-width', 2).attr('marker-end', 'url(#end)');
      svg.append('svg:defs').selectAll('marker')
        .data(['end'])      // Different link/path types can be defined here
        .enter().append('svg:marker')    // This section adds in the arrows
        .attr('id', String)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 18)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('svg:path')
        .attr('d', 'M0,-5L10,0L0,5').style('fill', '#000000');
      link = linkEnter.merge(link);
      node = svg
        .selectAll('.node')
        .data(nodes, function (d: any) { return d.id; });
      node.exit().remove();
      const nodeEnter = node
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('stroke', '#666')
        .attr('stroke-width', 2)
        .style('fill', color)
        .style('opacity', 1)
        .style('visibility', function (d) {
          // return d ? 'hidden' : 'visible';
          if (d.data.visible === false) { return 'hidden'; }
        })
        .on('click', clicked)
        .call(d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended));
      nodeEnter.append('circle')
        .attr('r', 10)
        .style('text-anchor', function (d) { return d.children ? 'end' : 'start'; });
      // Cardinality
      // nodeEnter.append('text')
      // .attr('dx', '-.25em')
      // .attr('dy', '.35em')
      //         .text(function(d) { if (d.children) { return '0'; } else {return '1'; } });
      // Join Name
      // nodeEnter.append('text').attr('letter-spacing', '1px').attr('font-size', 15)
      // .attr('dx', -93)
      // .attr('dy', -4)
      // .text(function(d) { if (d.children) { return 'Join_Name'; } } );
      nodeEnter.append('text')
        .attr('font-size', 10).attr('font-weight', 100).attr('letter-spacing', '2px')
        .attr('dx', 15)
        .attr('dy', 4)
        .text(function (d: any) { return d.data.name; });
      nodeEnter.on('mouseover', function (d) {
        const nodename = d.data.name;
        link.style('visibility', function (d) {
          if (d.parent !== null) {
            if (d.target.data.visible === false && d.target.parent.data.name === nodename) {
              return 'visible';
            } else {
              return 'none';
            }
          }
        });
        node.style('visibility', function (d) {
          if (d.parent !== null) {
            if (d.data.visible === false && d.parent.data.name === nodename) {
              return 'visible';
            } else {
              return 'none';
            }
          }
        });
        let ifSelected = 'Primary Table';
        if (d.parent !== null) {
          if (!d.data.visible) {
            ifSelected = 'Value Already Selected in this Level';
          } else {
            ifSelected = 'Select Value';
          }
        }
        if (d.data.id === 'NoRelation') {
          ifSelected = 'No Relationship';
        }
        div.transition().duration(200).style('opacity', .9);
        div.html(ifSelected)
          .style('left', (d3.event.pageX - 350) + 'px')
          .style('top', (d3.event.pageY - 100) + 'px');
        link.style('stroke-dasharray', function (l) {
          if (d === l.source || d === l.target) {
            return '5,5';
          }
        });
      });
      nodeEnter.on('mouseout', function () {
        link.style('visibility', function (d) { if (d.target.data.visible === false) { return 'hidden'; } });
        node.style('visibility', function (d) { if (d.data.visible === false) { return 'hidden'; } });
        div.transition().duration(500).style('opacity', 0);
        link.style('stroke-dasharray', 0);
      });
      node = nodeEnter.merge(node);
      simulation.nodes(nodes);
      simulation.force<any>('link').links(links);
    }
    // end of update

    function color(d) {
      return d.data.color;
      // return d.parent ? 'white' : '#F94B4C';
      // return d._children ? '#51A1DC' // collapsed package
      //   : d.children ? '#51A1DC' // expanded package
      //   : '#F94B4C'; // leaf node
    }


    function ticked() {
      link
        .attr('x1', function (d) { return d.source.x; })
        .attr('y1', function (d) { return d.source.y; })
        .attr('x2', function (d) { return d.target.x; })
        .attr('y2', function (d) { return d.target.y; });

      node
        .attr('transform', function (d) { return `translate(${d.x}, ${d.y})`; });
      // rotate
      // labelLine.attr('transform', function (d) {
      //   if (d.target.x < d.source.x) {
      //       const bbox = this.getBBox();
      //       const rx = bbox.x + bbox.width / 2;
      //       const ry = bbox.y + bbox.height / 2;
      //       return 'rotate(180 ' + rx + ' ' + ry + ')';
      //   } else {
      //       return 'rotate(0)';
      //   }
      // });
    }
    const self = this;
    function clicked(d) {
      if (!d3.event.defaultPrevented && d.data.visible) {
        // if (d.children) {
        //   d._children = d.children;
        //   d.children = null;
        // } else {
        //   d.children = d._children;
        //   d._children = null;
        // }
        // update();
        const currentColor = d3.select(this).style('fill');
        if (currentColor !== 'rgb(249, 75, 76)') {
          if (d.parent.data.enableClick || d.data.enableClick) {
            if (currentColor === 'white') {
              onClickChangeGraph(d.data);
            } else {
              // currentColor = 'white';
              // d.data.enableClick = false;
              // d.parent.data.enableClick = true;
              self.selectedValues.pop();
              self.joinListMap.delete(d.data.name);
              self.data = JSON.parse(toJson(self.selectedValues, self.joinListMap));
              update(self.data);
            }
            // d3.select(this).style('fill', currentColor);
          }
        }
      }
    }

    function onClickChangeGraph(value) {
      self.relationshipInfo = [];
      let tempHeader = new AdhocHeaderInfo();
      self.adhocService.updatedAdhocHeaderInfo.subscribe(response => {
        tempHeader = response;
      });
      self.tablelistService.getListOfRelationTableMMR(self.workspaceID, tempHeader.appMetadataVersion, value.name).subscribe(result => {
        if (self.tableService.booleanNested) {
          for (const i of result) {
            if (self.includesArray.includes(i.secondaryTable.tableName)) {
              self.relationshipInfo.push(i);
            }
          }
        } else {
          self.relationshipInfo = result;
        }
        self.primaryTable = getPrimaryArray(self.relationshipInfo);
        self.secondaryTable = getSecondaryArray(self.relationshipInfo);
        for (const i of self.primaryTable) {
          self.joinListMap.set(i.primaryTableName, CompleteArray(i.primaryTableId, i.primaryTableName, self.secondaryTable));
        }
        if (self.selectedValues[self.selectedValues.length - 1] !== value.name) {
          self.selectedValues.push(value.name);
        }
        self.data = JSON.parse(toJson(self.selectedValues, self.joinListMap));
        update(self.data);
      });
    }

    function dragstarted(d) {
      if (!d3.event.active) { simulation.alphaTarget(0.3).restart(); }
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
      d.px = validate(d.px, 0, width);
      d.py = validate(d.py, 0, height);
    }

    function validate(x, a, b) {
      if (x < a) {
        x = a;
      }
      if (x > b) {
        x = b;
      }
      return x;
    }

    function dragended(d) {
      // if (!d3.event.active) { simulation.alphaTarget(0); }
      d.fx = d.x;
      d.fy = d.y;
    }

    function flatten(rootx) {
      const nodes = [];
      function recurse(nodex: any) {
        if (nodex.children) { nodex.children.forEach(recurse); }
        if (!nodex.id) { nodex.id = ++i; } else { ++i; }
        nodes.push(nodex);
      }
      recurse(rootx);
      return nodes;
    }

    function zoomed() {
      svg.attr('transform', d3.event.transform);
    }

    update(this.data);
  }

}
