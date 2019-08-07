import { Component, OnInit } from '@angular/core';
import { ErtService } from '../ert-landing-page/ert.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErtTableListObj, TableDetailsListObj, ErtColumnListObj, ColumnListObj } from '../ert-landing-page/ert';
import { NgxSpinnerService } from 'ngx-spinner';
import { graphviz } from 'd3-graphviz';
import * as d3 from 'd3';
import { getUserId } from '../adhoc-landing-page/adhoc-utility-fn';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ert-clone-view',
  templateUrl: './ert-clone-view.component.html',
  styleUrls: ['./ert-clone-view.component.css']
})
export class ErtCloneViewComponent implements OnInit {
  workspaceId = '';
  ertJobId = '';
  searchTableName = '';
  graphInstance: any = '';
  data;
  ShowDiagram = true;
  originalErttableList: ErtTableListObj = new ErtTableListObj(); // to show ert table list in popup when we create or add job.
  totalItemOfOriginalErtTable = 50;
  currentPageOfOriginalErtTable = 1;
  searchOriginalTableName = '';
  isEditErtTableLeft = false;
  selectedTableList: TableDetailsListObj[] = [];
  selectedTableId = '';
  selectedTableName = '';
  ExpectedTableName = '';
  successMsg = '';
  errorMessage = '';
  option = {
    useWorker: false,
    fade: true,
    fit: true,
    zoom: true,
    splines: false,
    zoomScaleExtent: [0.1, 3]
  };
  cloneJobName = '';
  dotString = 'digraph {graph [pad="0.5", nodesep="0.10", ranksep="0.26"];node' +
    '[shape="plaintext" padding="0.2" fontsize="5" fontname = "Roboto"' +
    'pad="0.5" ];edge [shape=plaintext fontsize="3" fontname = "Roboto" arrowsize="0.3" ]rankdir=LR;';
  downloadErrorMsg = '';
  downloadSuccessMsg = '';
  JobMode = '';
  selectedValues: string[] = [];
  joinListMap = new Map();
  tempdata;
  tempfunctionTable = 'FunctionTable[shape="plaintext" label=<<table border="0" cellborder="1" cellspacing="0">' +
    '<tr><td bgcolor="#eef2f9" cellspacing="1" align="left"> Function Involved'
    + '  </td></tr>';
  expectedString = '';
  actualString = '';
  isFunction = false;
  constructor(private workspaceHeaderService: WorkspaceHeaderService, public router: Router,
    private ertService: ErtService, public activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.workspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.activatedRoute.params.subscribe((requestParam) => {
      this.ertJobId = requestParam.ertJobId;
    });
    this.getEditErtTableList(this.workspaceId, this.ertJobId, 1);
    this.ertService.updatedJobName.subscribe(jobName => {
      this.cloneJobName = jobName;
    });
    this.ertService.updatedjobType.subscribe(res => {
      this.JobMode = res;
    });
  }

  getEditErtTableList(workspaceId, ertJobId, currentIndex) {
    this.spinner.show();
    this.ertService.getERTtableList(workspaceId, ertJobId, currentIndex).subscribe(response => {
      try {
        this.originalErttableList = response;
        this.isEditErtTableLeft = response.isSelectedTableLeft;
        const tableIds = this.originalErttableList.ertTableList.map(function (item) { return item['tableId']; });
        for (const tempTable of this.originalErttableList.ertTableList) {
          const tempObj: TableDetailsListObj = new TableDetailsListObj();
          tempObj.tableId = tempTable.tableId;
          tempObj.tableName = tempTable.tableName;
          tempObj.modifiedTableName = tempTable.modifiedTableName;
          if (tempTable.filterNconfig !== null) {
            tempObj.filterAndOrderConfig = tempTable.filterNconfig;
          }
          if (tempTable.relatedTableDetails !== null) {
            tempObj.relatedTableDetails = tempTable.relatedTableDetails;
          }
          tempObj.isSelected = true;
          if (this.selectedTableList.findIndex(a => a.tableId === tempTable.tableId) === -1) {
            this.selectedTableList.push(tempObj);
          }
        }
        if (this.JobMode.trim().toUpperCase() === 'TABLE') {
          this.getEditedERTcolumnlist(ertJobId, workspaceId, tableIds);
        } else {
          this.getExtractAndIngestInfo();
        }

      } catch {
        this.spinner.hide();
      }
    });
  }

  getEditedERTcolumnlist(ertJobId, workspaceId, tableIds: string[]) {
    const ertTableColumnMap = new Map();
    let ertColumnList: ErtColumnListObj[] = [];
    this.ertService.getEditedtERTcolumnlist(ertJobId, workspaceId, tableIds).subscribe(response => {
      ertColumnList = response;
      try {
        for (let item = 0; item < tableIds.length; item++) {
          ertTableColumnMap.set(tableIds[item], ertColumnList[item]);
        }
        for (const tableId of tableIds) {
          this.selectedTableList.filter(a => a.tableId === tableId)[0].columnList = ertTableColumnMap.get(tableId);
        }
        this.spinner.hide();
        this.showTableRelationship();
      } catch {
        this.spinner.hide();
      }
    });
  }


  getExtractAndIngestInfo() {
    this.ertService.getExtractConfig(this.ertJobId).subscribe(result => {
      try {
        this.spinner.hide();
        this.data = JSON.parse(result.graphDetails.data.replace(/'/g, '"'));
        // this.data = this.ertService.data;
        this.createchart();
      } catch {
        this.spinner.hide();
      }
    }, (err: HttpErrorResponse) => {
      if (err.error) {
        this.spinner.hide();
        document.getElementById('not-saved-popup-btn"').click();
        this.errorMessage = err.error.message;
      }
    });
  }

  showTableRelationship() {
    if (this.selectedTableList[0] !== undefined) {
      this.selectedTableId = this.selectedTableList[0].tableId;
      const tempTableObj = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0];
      this.selectedTableName = tempTableObj.tableName;
      this.ExpectedTableName = tempTableObj.modifiedTableName;
      tempTableObj.isMainTable = true;
      this.createDOTActualTable(this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].columnList);
    }
  }
  selectTable(tableId) {
    if (this.JobMode.trim().toUpperCase() === 'TABLE') {
      this.dotString = 'digraph {graph [pad="0.5", nodesep="0.5", ranksep="2"];node' +
        '[shape="plain" fontname = "Roboto" fontsize ="5" ];edge [shape="plain" fontname = "Roboto" ' +
        'arrowsize="0.3" fontsize ="3" ]rankdir=LR;';
      this.selectedTableId = tableId;
      this.selectedTableName = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].tableName;
      this.ExpectedTableName = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].modifiedTableName;
      // graphviz('#graph', this.option).resetZoom(d3.transition('smooth'));
      // d3.select('svg').remove();
      this.createDOTActualTable(this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].columnList);
    }
  }

  createDOTActualTable(columnList: ColumnListObj[]) {
    if (this.JobMode.trim().toUpperCase() === 'TABLE') {
      this.actualString = this.actualString + this.selectedTableName +
        'original' + '[ shape="plaintext" label=<<table border="0" cellborder="1" cellspacing="0">';
      this.actualString = this.actualString + '<tr><td bgcolor="#eef2f9" cellspacing="1" align="left">' +
        this.selectedTableName + '   </td></tr>';
      for (const item of columnList.filter(a => a.dataType !== 'USERDEFINED')) {
        this.actualString = this.actualString + '<tr><td align="left" port = "' +
          item.originalColumnName + 'start"' + '> ' + item.originalColumnName + '  </td></tr>';
        if (item.viewQuery) {
          this.isFunction = true;
          if (item.viewQuery !== '') {
            this.isFunction = true;
            this.tempfunctionTable = this.tempfunctionTable + '<tr><td align="left" port = "' +
              item.originalColumnName + 'tempFncStart"' + '> ' + item.viewQuery + '  </td></tr>';
          }
        }
      }
      this.actualString = this.actualString + '</table>>];';
      this.createDOTExpectedTable(columnList);
    }
  }

  reInitInstance() {
    this.dotString = 'digraph {graph [pad="0.5", nodesep="0.10", ranksep="0.26"];node' +
      '[shape="plaintext" padding="0.2" fontsize="5" fontname = "Roboto"' +
      'pad="0.5" ];edge [shape=plaintext fontsize="3" fontname = "Roboto" arrowsize="0.3" ]rankdir=LR;';
    this.tempfunctionTable = 'FunctionTable[shape="plaintext" label=<<table border="0" cellborder="1" cellspacing="0">' +
      '<tr><td bgcolor="#eef2f9" cellspacing="1" align="left"> Function Involved'
      + '  </td></tr>';
    this.expectedString = '';
    this.actualString = '';
    this.isFunction = false;
  }

  createDOTExpectedTable(columnList: ColumnListObj[]) {
    this.expectedString = this.expectedString + this.ExpectedTableName
      + 'expected' + '[shape="plaintext"  label=<<table border="0" cellborder="1" cellspacing="0">';
    this.expectedString = this.expectedString +
      '<tr><td bgcolor="#eef2f9" cellspacing="1" align="left">' + this.ExpectedTableName + '   </td></tr>';
    for (const item of columnList.filter(a => a.isSelected === true && a.dataType !== 'USERDEFINED')) {
      this.expectedString = this.expectedString + '<tr><td align="left" port = "' +
        item.modifiedColumnName + 'end"' + '> ' + item.modifiedColumnName + '  </td></tr>';
    }
    const tempObj = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0];
    if (tempObj.usrDefinedColumnList.length !== 0) {
      for (const item of tempObj.usrDefinedColumnList.filter(a => a.isSelected === true
        && a.dataType.trim().toUpperCase() === 'USERDEFINED')) {
        this.expectedString = this.expectedString + '<tr><td align="left" port = "' +
          item.modifiedColumnName + 'end"' + '> ' + item.modifiedColumnName + '  </td></tr>';
        if (item.viewQuery) {
          this.isFunction = true;
          this.tempfunctionTable = this.tempfunctionTable + '<tr><td align="left" port = "' +
            item.originalColumnName + 'userTempFncStart"' + '> ' + item.viewQuery + '  </td></tr>';
        }
      }
    } if (tempObj.columnList.length !== 0) {
      for (const item of tempObj.columnList.filter(a => a.isSelected === true && a.dataType.trim().toUpperCase() === 'USERDEFINED')) {
        this.expectedString = this.expectedString + '<tr><td align="left" port = "' +
          item.modifiedColumnName + 'end"' + '>' + item.modifiedColumnName + '  </td></tr>';
        if (item.viewQuery) {
          this.isFunction = true;
          this.tempfunctionTable = this.tempfunctionTable + '<tr><td align="left" port = "' +
            item.originalColumnName + 'userTempFncStart"' + '> ' + item.viewQuery + '  </td></tr>';
        }
      }
    }
    this.tempfunctionTable = this.tempfunctionTable + '</table>>];';
    this.expectedString = this.expectedString + '</table>>];';
    this.createTableLink(columnList);
  }


  createTableLink(columnList: ColumnListObj[]) {
    let linkString = '';
    for (const item of columnList.filter(a => a.isSelected === true && a.dataType !== 'USERDEFINED')) {
      linkString = linkString + this.selectedTableName + 'original:' + item.originalColumnName + 'start' + ' -> ' +
        this.ExpectedTableName + 'expected:' + item.modifiedColumnName + 'end;';
      if (item.viewQuery) {
        this.isFunction = true;
        linkString = linkString + this.selectedTableName + 'original:' + item.originalColumnName + 'start' + ' -> ' +
          'FunctionTable:' + item.originalColumnName + 'tempFncStart;';
        linkString = linkString + 'FunctionTable:' + item.originalColumnName + 'tempFncStart' + ' -> ' +
          this.ExpectedTableName + 'expected:' + item.modifiedColumnName + 'end;';
      }
    }
    const tempObj = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0];

    if (tempObj.usrDefinedColumnList.length !== 0) {
      for (const item of tempObj.usrDefinedColumnList.filter(a => a.isSelected === true && a.dataType === 'USERDEFINED')) {
        const a = JSON.parse(item.userColumnQuery.replace(/'/g, '"'));
        const that = this;
        if (item.viewQuery) {
          a.forEach(function (list, index) {
            that.isFunction = true;
            linkString = linkString + that.selectedTableName + 'original:' + list.column + 'start' + ' -> ' +
              'FunctionTable:' + item.originalColumnName + 'userTempFncStart;';
            if (index === 0) {
              linkString = linkString + 'FunctionTable:' + item.originalColumnName + 'userTempFncStart' + ' -> ' +
                that.ExpectedTableName + 'expected:' + item.modifiedColumnName + 'end;';
            }
          });
        }
      }
    }
    if (tempObj.columnList.length !== 0) {
      for (const item of tempObj.columnList.filter(a => a.isSelected === true && a.dataType === 'USERDEFINED')) {
        const a = JSON.parse(item.userColumnQuery.replace(/'/g, '"'));
        const that = this;
        if (item.viewQuery) {
          a.forEach(function (list, index) {
            that.isFunction = true;
            linkString = linkString + that.selectedTableName + 'original:' + list.column + 'start' + ' -> ' +
              'FunctionTable:' + item.originalColumnName + 'userTempFncStart;';
            if (index === 0) {
              linkString = linkString + 'FunctionTable:' + item.originalColumnName + 'userTempFncStart' + ' -> ' +
                that.ExpectedTableName + 'expected:' + item.modifiedColumnName + 'end;';
            }
          });
        }
      }
    }
    this.dotString = this.dotString + this.actualString;
    if (this.isFunction) {
      this.dotString = this.dotString + this.tempfunctionTable;
    }
    this.dotString = this.dotString + this.expectedString + linkString + '}';
    this.drawTableRelationship();
  }


  drawTableRelationship() {
    this.graphInstance = graphviz('#graph', this.option).transition(this.transitionFactory)
      .tweenShapes(false).attributer(this.attributer).renderDot(this.dotString);
    this.resetZoom();
    // this.resetZoom();
  }
  resetZoom() {
    graphviz('#graph', this.option).resetZoom(d3.transition().duration(1000));
  }

  attributer(datum, index, nodes) {
    const selection = d3.select(this);
    if (datum.tag === 'svg') {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const x = 60;
      const y = 10;
      const scale = 3;
      selection
        .attr('width', width + 'pt')
        .attr('height', height + 'pt')
        .attr('viewBox', -x + ' ' + -y + ' ' + (width / scale) + ' ' + (height / scale));
      datum.attributes.width = width + 'pt';
      datum.attributes.height = height + 'pt';
      datum.attributes.viewBox = -x + ' ' + -y + ' ' + (width / scale) + ' ' + (height / scale);
    }
  }

  transitionFactory() {
    return d3.transition('main')
      .ease(d3.easeLinear)
      .delay(40)
      .duration(300 * 3);
  }

  openCloneJobpopup() {
    document.getElementById('clone-edit-name').click();
  }

  checkForEmptyName() {
    if (this.cloneJobName.length === 0) {
      this.ertService.updatedJobName.subscribe(jobName => {
        this.cloneJobName = jobName;
      });
    }
  }

  createClone() {
    this.spinner.show();
    const param: any = {
      'userId': getUserId(),
      'workspaceId': this.workspaceId,
      'ertJobName': this.cloneJobName,
      'ertJobId': this.ertJobId
    };
    this.ertService.createCloneJob(param).subscribe(res => {
      this.spinner.hide();
      document.getElementById('message-popup-btn').click();
      this.successMsg = 'Job Clone Created Successfully.';
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        this.spinner.hide();
      } else {
        this.spinner.hide();
        document.getElementById('not-saved-popup-btn').click();
        this.errorMessage = err.error.message;
      }
    });
  }

  cancel() {
    this.router.navigate(['/workspace/ert/ert-jobs']);
  }


  // DATA RECORD AND SIP Graph Code
  createchart() {
    // push the parent node
    const width = 1000,
      height = 1000;

    let i = 0;

    // const root = d3.hierarchy(this.data);
    const transform = d3.zoomIdentity;
    let node, link;

    // tslint:disable-next-line: max-line-length
    const svg = d3.select('body app-root app-workspace-landing-page app-ert-landing-page #ert-landing-id .container-fluid app-ert-clone-view #ert-table-id .row .col-md-9 .card')
      .append('svg')
      .call(d3.zoom().scaleExtent([1 / 2, 8]).on('zoom', zoomed))
      .append('g')
      .attr('transform', 'translate(40,0)');

    // tslint:disable-next-line: max-line-length
    const div = d3.select('body app-root app-workspace-landing-page app-ert-landing-page #ert-landing-id .container-fluid app-ert-clone-view #ert-table-id .row .col-md-9 .card').append('div')
      .attr('class', 'tooltipd3')
      .style('opacity', 0);

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(function (d: any) { return d.id; }).distance(100).strength(0.5)) // distance & strength added
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
        .style('stroke-dasharray', function (d) { if (d.target.data.color === '#e0e0e0') { return '4,2'; } })
        .style('opacity', '0.2')
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
        let ifSelected;
        if (d.data.color === '#F94B4C') {
          ifSelected = 'Primary Table';
        } else if (d.data.color === 'white') {
          ifSelected = 'Select Value';
        } else if (d.data.color === 'black') {
          ifSelected = 'Value Already Selected';
        } else {
          ifSelected = 'Already a Selected Parent';
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
        div.transition().duration(500).style('opacity', 0);
        link.style('stroke-dasharray', function (d) { if (d.target.data.color === '#e0e0e0') { return '4,2'; } });
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
      for (let i = 0; i < 100; i++) {
        simulation.tick();
      }
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
    //function clicked(d) {
    // if (!d3.event.defaultPrevented) {
    // if (d.children) {
    //   d._children = d.children;
    //   d.children = null;
    // } else {
    //   d.children = d._children;
    //   d._children = null;
    // }
    // update();
    //  const currentColor = d3.select(this).style('fill');
    // if (!self.exclude_click.includes(currentColor)) {
    // if (d.parent.data.enableClick || d.data.enableClick) {
    //  if (currentColor === 'white') {
    //    onClickChangeGraph(d.data);
    //  } else {
    //   const children = d.data.children;
    //   let eligibleForDeselect = true;
    //   for (let i of children) {
    //    if (i.enableClick) {
    //       eligibleForDeselect = false;
    //     }
    //   }
    // currentColor = 'white';
    // d.data.enableClick = false;
    // d.parent.data.enableClick = true;
    //  if (eligibleForDeselect) {
    //    const index = self.selectedValues.indexOf(d.data.name);
    //   self.selectedValues.splice(index, 1);
    //    self.joinListMap.delete(d.data.name);
    //    self.data = JSON.parse(getSIPGraphData(self.selectedValues, self.joinListMap));
    //  update(self.data);
    // }
    //}
    // d3.select(this).style('fill', currentColor);
    // }
    //}
    //}
    // }

    // function onClickChangeGraph(value) {
    //   self.tablelistService.getListOfRelationTableMMR(self.workspaceID, self.ertService.mmrVersion, value.name).subscribe(result => {
    //     self.relationshipInfo = result;
    //     self.primaryTable = getPrimaryArray(self.relationshipInfo);
    //     self.secondaryTable = getSecondaryArray(self.relationshipInfo);
    //     for (const i of self.primaryTable) {
    //       self.joinListMap.set(i.primaryTableName, CompleteArray(i.primaryTableId, i.primaryTableName, self.secondaryTable));
    //     }
    //     if (self.selectedValues[self.selectedValues.length - 1] !== value.name) {
    //       self.selectedValues.push(value.name);
    //     }
    //     self.data = JSON.parse(getSIPGraphData(self.selectedValues, self.joinListMap));
    //     update(self.data);
    //   });
    // }

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
