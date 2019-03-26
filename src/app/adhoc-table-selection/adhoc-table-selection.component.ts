import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TableListService } from '../table-list/table-list.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import * as d3 from 'd3';
import { toJson } from '../ert-datarecord-config/tree';
import { CompleteArray, getPrimaryArray, getSecondaryArray } from '../ert-datarecord-config/class';
import { AdhocSavedObjectService } from '../adhoc-header/adhoc-saved-object.service';
import { GraphDetails, Adhoc, LinearTableMapOrder } from '../adhoc-landing-page/adhoc';


@Component({
  selector: 'app-adhoc-table-selection',
  templateUrl: './adhoc-table-selection.component.html',
  styleUrls: ['./adhoc-table-selection.component.css']
})
export class AdhocTableSelectionComponent implements OnInit {

  workspaceID: any;
  tableList: any;
  relationshipInfo: any[];
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
  constructor(public router: Router, private tablelistService: TableListService,
    private workspaceHeaderService: WorkspaceHeaderService, public activatedRoute: ActivatedRoute,
    private adhocSavedObjectService: AdhocSavedObjectService) { }

  ngOnInit() {
    const tempTables: { tableId: string, tableName: string, databaseName: string }[] = [];
    this.workspaceID = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.screenInfoObject = this.adhocSavedObjectService.screenInfoObject;
    if (this.screenInfoObject.sessionAdhocModel.selectedTableListString !== '') {
      const tempTableList = JSON.parse(this.screenInfoObject.sessionAdhocModel.selectedTableListString);
      for (const item of tempTableList) {
        tempTables.push({ 'tableId': item.tableId, 'tableName': item.tableName, 'databaseName': item.schemaName });
      }
      this.tableList = tempTables;
    } else {
      this.tablelistService.getTableList(this.workspaceID).subscribe(res => {
        this.tableList = res;
        this.schemaResultsTableCount = this.tableList.length;
      });
    }
    if (this.screenInfoObject.sessionAdhocModel.graphDetails.data !== '') {
      this.data = JSON.parse(this.screenInfoObject.sessionAdhocModel.graphDetails.data.replace(/'/g, '"'));
      this.selectedValues = JSON.parse(this.screenInfoObject.sessionAdhocModel.graphDetails.selectedValues.replace(/'/g, '"'));
      this.joinListMap = new Map(JSON.parse(this.screenInfoObject.sessionAdhocModel.graphDetails.joinListMap.replace(/'/g, '"')));
      this.selectedPrimaryTable = JSON.parse(this.screenInfoObject.sessionAdhocModel.graphDetails.selectedPrimaryTable.replace(/'/g, '"'));
      this.createchart();
    }
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
    this.router.navigate(['/workspace/adhoc/screen/search-criteria']);
  }

  createLinearTableMapOrder(selectedValues: string[] = [], joinListMap = new Map): LinearTableMapOrder[] {
    const tableNames = selectedValues;
    const linearTableMapOrder: LinearTableMapOrder[] = [];
    for (let i = 0; i < tableNames.length; i++) {
      const tableId = joinListMap.get(tableNames[i])[0].primaryTableId;
      linearTableMapOrder.push({ 'ordinal': i + 1, 'tableId': tableId, 'tableName': tableNames[i] });
    }
    return linearTableMapOrder;
  }

  gotoScreenApp() {
    this.router.navigate(['/workspace/adhoc/app-screen-list']);
  }

  populategraph(value, event) {
    this.selectedPrimaryTable = event.target.value;
    d3.select('svg').remove();
    this.selectedValues = [];
    this.tablelistService.getListOfRelationTable(value.tableId, this.workspaceID).subscribe(result => {
      this.relationshipInfo = result;
      this.primaryTable = getPrimaryArray(this.relationshipInfo);
      this.secondaryTable = getSecondaryArray(this.relationshipInfo);
      for (const i of this.primaryTable) {
        this.joinListMap.set(i.primaryTableName, CompleteArray(i.primaryTableId, i.primaryTableName, this.secondaryTable));
      }
      this.selectedValues.push(value.tableName);
      this.data = JSON.parse(toJson(this.selectedValues, this.joinListMap));
      this.createchart();
    });
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
        link.style('visibility', function (d) { if (d.target.data.visible === false) { return 'visible'; } });
        node.style('visibility', function (d) { if (d.data.visible === false) { return 'visible'; } });
        let ifSelected = 'Primary Table';
        if (d.parent !== null) {
          if (!d.parent.data.enableClick) {
            ifSelected = 'Value Already Selected in this Level';
          } else {
            ifSelected = 'Select Value';
          }
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
      if (!d3.event.defaultPrevented) {
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
      self.tablelistService.getListOfRelationTable(value.id, self.workspaceID).subscribe(result => {
        self.relationshipInfo = result;
        self.primaryTable = getPrimaryArray(self.relationshipInfo);
        self.secondaryTable = getSecondaryArray(self.relationshipInfo);
        for (const i of self.primaryTable) {
          self.joinListMap.set(i.primaryTableName, CompleteArray(i.primaryTableId, i.primaryTableName, self.secondaryTable));
        }
        self.selectedValues.push(value.name);
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
      if (!d3.event.active) { simulation.alphaTarget(0); }
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
