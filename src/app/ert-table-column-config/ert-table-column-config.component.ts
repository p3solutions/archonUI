import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ErtService } from '../ert-landing-page/ert.service';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { TableDetailsListObj, IngestionDataConfig, ColumnListObj } from '../ert-landing-page/ert';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { graphviz } from 'd3-graphviz';
import * as d3 from 'd3';
import { GraphDetails } from '../adhoc-landing-page/adhoc';
import { toJson, getERTSummaryPageGraphDataRecord } from '../ert-datarecord-config/tree';

@Component({
  selector: 'app-ert-table-column-config',
  templateUrl: './ert-table-column-config.component.html',
  styleUrls: ['./ert-table-column-config.component.css']
})
export class ErtTableColumnConfigComponent implements OnInit {
  searchTableName: string;
  ertJobId = '';
  from = '';
  selectedTableList: TableDetailsListObj[] = [];
  selectedTableId = '';
  selectedTableName = '';
  ExpectedTableName = '';
  isDisabled: boolean;
  issaveDisabled: boolean;
  successMsg = '';
  errorMessage = '';
  option = {
    width: 500,
    height: 400,
    useWorker: false,
    zoomScaleExtent: [0.1, 3]
  };
  graphInstance: any = '';
  data;
  ShowDiagram = true;
  graphDetails: GraphDetails = new GraphDetails();
  dotString = 'digraph {graph [pad="0.5", nodesep="0.5", ranksep="2"];node [shape="plain" padding="0.2" fontsize="5" fontname = "Roboto"' +
    'pad="0.5" ];edge [shape="plain" fontsize="3" fontname = "Roboto" arrowsize="0.3" ]rankdir=LR;';
  downloadErrorMsg = '';
  downloadSuccessMsg = '';
  JobMode = '';
  selectedValues: string[] = [];
  joinListMap = new Map();
  tempdata;
  constructor(public router: Router, private workspaceHeaderService: WorkspaceHeaderService, private spinner: NgxSpinnerService,
    private ertService: ErtService, private activatedRoute: ActivatedRoute, private userinfoService: UserinfoService) { }

  ngOnInit() {
    this.selectedTableList = this.ertService.selectedList.filter(a => a.isSelected === true);
    this.from = this.activatedRoute.snapshot.queryParamMap.get('from');
    this.ertService.updatedjobType.subscribe(res => {
      this.JobMode = res;
    });
    if (this.selectedTableList[0] !== undefined) {
      this.selectedTableId = this.selectedTableList[0].tableId;
      const tempTableObj = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0];
      this.selectedTableName = tempTableObj.tableName;
      this.ExpectedTableName = tempTableObj.modifiedTableName;
      tempTableObj.isMainTable = true;
      setTimeout(() => {
        if (this.JobMode.trim().toUpperCase() === 'TABLE') {
          this.createDOTActualTable(tempTableObj.columnList);
        }
      }, 500);
      if (this.JobMode.trim().toUpperCase() !== 'TABLE') {
        this.selectedTableId = '';
        this.showDataRecordAndSIPGraph();
        this.ShowDiagram = false;
      }
    }
  }

  showColumns(value) {
    if (value === 'original') {
      if (this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0] !== undefined) {
        return this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].
          columnList.filter(a => a.dataType !== 'USERDEFINED');
      } else {
        return [];
      }
    } else if (value === 'expected') {
      if (this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0] !== undefined) {
        return this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].columnList
          .filter(a => a.isSelected === true);
      } else {
        return [];
      }
    }
  }

  showColumnsForUserDefined() {
    const tempObj = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0];
    if (tempObj !== undefined) {
      if (tempObj.usrDefinedColumnList !== undefined) {
        return this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].
          usrDefinedColumnList.filter(a => a.dataType === 'USERDEFINED' && a.isSelected === true);
      } else if (tempObj.usrDefinedColumnList === undefined) {
        return this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].
          columnList.filter(a => a.dataType === 'USERDEFINED' && a.isSelected === true);
      }
    } else {
      return [];
    }
  }

  gotoExtractData() {
    this.from = this.activatedRoute.snapshot.queryParamMap.get('from');
    this.activatedRoute.params.subscribe((requestParam) => {
      this.ertJobId = requestParam.ertJobId;
    });
    if (this.from === 'data-record' || this.from === 'SIP') {
      if (this.ertJobId !== '' && this.ertJobId !== undefined) {
        this.router.navigate(['workspace/ert/ert-extract-ingest/', this.ertJobId], { queryParams: { from: this.from } });
      } else {
        this.router.navigate(['workspace/ert/ert-extract-ingest/'], { queryParams: { from: this.from } });
      }
    } else
      if (this.ertJobId !== '' && this.ertJobId !== undefined) {
        this.router.navigate(['workspace/ert/ert-extract-ingest/', this.ertJobId]);
      } else {
        this.router.navigate(['workspace/ert/ert-extract-ingest']);
      }
  }


  saveERTJob(ertJobStatus: string) {
    if (this.ertService.data !== undefined) {
      this.graphDetails.data = JSON.stringify(this.ertService.data).replace(/"/g, '\'');
    }
    try {
      this.errorMessage = '';
      this.spinner.show();
      let selectedList: any = '';
      this.deleteUnWantedObject();
      this.activatedRoute.params.subscribe((requestParam) => {
        this.ertJobId = requestParam.ertJobId;
      });
      if (this.ertJobId !== '' && this.ertJobId !== undefined) {
        selectedList = this.ertService.selectedList;
      } else {
        selectedList = this.ertService.selectedList.filter(a => a.isSelected === true);
      }
      let param: any = {
        'userId': this.userinfoService.getUserId(),
        'workspaceId': this.workspaceHeaderService.getSelectedWorkspaceId(),
        'ertJobStatus': ertJobStatus,
        'graphDetails': this.graphDetails,
        'schemaResultsTableCount': this.ertService.schemaResultsTableCount.toString(),
        'isIngest': false,
        'databaseConfig': {
          'databaseId': this.workspaceHeaderService.getDatabaseID()
        },
        'ertJobParams': this.ertService.ertJobParams,
        'tableDetailsList': selectedList,
        'ingestionDataConfig': this.ertService.ingestionDataConfig,
        'extractDataConfigInfo': this.ertService.extractDataConfigInfo
      };

      param = this.modifiedParamForEdit(param);
      param = this.deleteFilterObject(param);
      if (ertJobStatus === 'READY' || ertJobStatus === 'DRAFT') {
        this.saveDraftAndCompleteJob(param, ertJobStatus);
      } else {
        this.downloadPDI(param);
      }
    } catch {
      this.spinner.hide();
    }
  }

  deleteFilterObject(param: any): any {
    if (param.ingestionDataConfig.infoArchiveName === '' || param.ingestionDataConfig.infoArchiveSchemaName === ''
      || param.ingestionDataConfig.infoArchiveUserName === '' || param.ingestionDataConfig.infoArchivePassword === '') {
      delete param['ingestionDataConfig'];
    } else {
      param.isIngest = true;
    }
    return param;
  }

  deleteUnWantedObject() {
    for (const item of this.ertService.selectedList) {
      if (item.filterAndOrderConfig !== undefined &&
        item.filterAndOrderConfig.filterConfig === '' && item.filterAndOrderConfig.filterQuery === '') {
        delete item['filterAndOrderConfig'];
      } else if (item.filterAndOrderConfig !== undefined
        && item.filterAndOrderConfig.filterConfig === null && item.filterAndOrderConfig.filterQuery === null) {
        delete item['filterAndOrderConfig'];
      }
      if (item.usrDefinedColumnList !== undefined && item.usrDefinedColumnList.length === 0) {
        delete item['usrDefinedColumnList'];
      }
      if (item.relatedTableDetails !== undefined && item.relatedTableDetails.length === 0) {
        delete item['relatedTableDetails'];
      }
      for (const item1 of item.columnList) {
        if (item1.userColumnQuery === null) {
          delete item1['userColumnQuery'];
        }
        if (item1.viewQuery === null) {
          delete item1['viewQuery'];
        }
      }
    }
  }

  downloadPDI(param) {
    this.ertService.downloadMetadata(param).subscribe(data => {
      if (data === undefined) {
        this.spinner.hide();
        document.getElementById('download_btn_error').click();
        this.downloadErrorMsg = 'Download Failed. Please check status monitoring page for details.';
      } else {
        document.getElementById('message-download-popup-btn').click();
        this.downloadSuccessMsg = 'Download Started';
        this.downloadFile(data, param);
        this.spinner.hide();
      }
    });
  }

  downloadFile(content, param) {
    let fileName = '';
    let type = '';
    if (param.ertJobParams.ertJobMode.trim().toUpperCase() === 'DATA_RECORD') {
      fileName = param.ertJobParams.ertJobTitle + '.xml';
      type = 'xml';
    } else if (param.ertJobParams.ertJobMode.trim().toUpperCase() === 'SIP') {
      fileName = param.ertJobParams.ertJobTitle + '.xsd';
      type = 'xsd';
    }
    const e = document.createEvent('MouseEvents');
    const a = document.createElement('a');
    a.download = fileName;
    a.href = window.URL.createObjectURL(content);
    a.dataset.downloadurl = [type, a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  }


  saveDraftAndCompleteJob(param, ertJobStatus) {
    this.ertService.saveErtJob(param).subscribe(result => {
      this.spinner.hide();
      const msg = ertJobStatus.trim().toUpperCase() === 'DRAFT' ? 'Job successfully saved as draft.' :
        'Job successfully marked as completed.';
      this.spinner.hide();
      document.getElementById('message-popup-btn').click();
      this.successMsg = msg;
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


  modifiedParamForEdit(param: any): any {
    if (this.from === 'data-record') {
      delete param.extractDataConfigInfo['applicationName'];
      delete param.extractDataConfigInfo['holdingName'];
    } else if (this.from === 'SIP') {
      delete param.extractDataConfigInfo['titleName'];
    } else {
      delete param.extractDataConfigInfo['titleName'];
      delete param.extractDataConfigInfo['applicationName'];
      delete param.extractDataConfigInfo['holdingName'];
    }
    this.from = this.activatedRoute.snapshot.queryParamMap.get('from');
    if (this.ertJobId !== '' && this.ertJobId !== undefined) {
      param.ertJobId = this.ertJobId;
    }
    if (this.from === 'data-record' || this.from === 'SIP') {
      param.mmrVersion = this.ertService.mmrVersion;
    }
    return param;
  }

  cancel() {
    if (this.JobMode.trim().toUpperCase() !== 'TABLE') {
      d3.select('svg').remove();
    }
    this.router.navigate(['/workspace/ert/ert-jobs']);
  }

  // Diagram for Graph column Mode.

  selectTable(tableId) {
    if (this.JobMode.trim().toUpperCase() === 'TABLE') {
      this.ShowDiagram = true;
      this.dotString = 'digraph {graph [pad="0.5", nodesep="0.5", ranksep="2"];node' +
        '[shape="plain" fontname = "Roboto" fontsize ="5" ];edge [shape="plain" fontname = "Roboto" ' +
        'arrowsize="0.3" fontsize ="3" ]rankdir=LR;';
      this.selectedTableId = tableId;
      this.selectedTableName = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].tableName;
      this.ExpectedTableName = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].modifiedTableName;
      this.createDOTActualTable(this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].columnList);
    }
  }

  createDOTActualTable(columnList: ColumnListObj[]) {
    if (this.JobMode.trim().toUpperCase() === 'TABLE') {
      this.dotString = this.dotString + this.selectedTableName + 'original' + '[label=<<table border="0" cellborder="1" cellspacing="0">';
      this.dotString = this.dotString + '<tr><td bgcolor="#eef2f9" cellspacing="1" align="left">' +
        this.selectedTableName + '   </td></tr>';
      for (const item of columnList.filter(a => a.dataType !== 'USERDEFINED')) {
        this.dotString = this.dotString + '<tr><td align="left" port = "' +
          item.originalColumnName + 'start"' + '> ' + item.originalColumnName + '  </td></tr>';
      }
      this.dotString = this.dotString + '</table>>];';
      this.createDOTExpectedTable(columnList);
    }
  }

  createDOTExpectedTable(columnList: ColumnListObj[]) {
    this.dotString = this.dotString + this.ExpectedTableName + 'expected' + '[label=<<table border="0" cellborder="1" cellspacing="0">';
    this.dotString = this.dotString + '<tr><td bgcolor="#eef2f9" cellspacing="1" align="left">' + this.ExpectedTableName + '   </td></tr>';
    for (const item of columnList.filter(a => a.isSelected === true && a.dataType !== 'USERDEFINED')) {
      this.dotString = this.dotString + '<tr><td align="left" port = "' +
        item.modifiedColumnName + 'end"' + '> ' + item.modifiedColumnName + '  </td></tr>';
    }
    const tempObj = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0];
    if (tempObj.usrDefinedColumnList.length !== 0) {
      for (const item of tempObj.usrDefinedColumnList.filter(a => a.isSelected === true
        && a.dataType.trim().toUpperCase() === 'USERDEFINED')) {
        this.dotString = this.dotString + '<tr><td align="left" port = "' +
          item.modifiedColumnName + 'end"' + '> ' + item.modifiedColumnName + '  </td></tr>';
      }
    } if (tempObj.columnList.length !== 0) {
      for (const item of tempObj.columnList.filter(a => a.isSelected === true && a.dataType.trim().toUpperCase() === 'USERDEFINED')) {
        this.dotString = this.dotString + '<tr><td align="left" port = "' +
          item.modifiedColumnName + 'end"' + '>' + item.modifiedColumnName + '  </td></tr>';
      }
    }

    this.dotString = this.dotString + '</table>>];';
    this.createTableLink(columnList);
  }


  createTableLink(columnList: ColumnListObj[]) {
    for (const item of columnList.filter(a => a.isSelected === true && a.dataType !== 'USERDEFINED')) {
      this.dotString = this.dotString + this.selectedTableName + 'original:' + item.originalColumnName + 'start' + ' -> ' +
        this.ExpectedTableName + 'expected:' + item.modifiedColumnName + 'end ';
      if (item.viewQuery) {
        this.dotString = this.dotString + '[label="' + item.viewQuery + '"]' + '; ';
      } else {
        this.dotString = this.dotString + ';';
      }
    }
    const tempObj = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0];

    if (tempObj.usrDefinedColumnList.length !== 0) {
      for (const item of tempObj.usrDefinedColumnList.filter(a => a.isSelected === true && a.dataType === 'USERDEFINED')) {
        const a = JSON.parse(item.userColumnQuery.replace(/'/g, '"'));
        for (const list of a) {
          this.dotString = this.dotString + this.selectedTableName + 'original:' + list.column + 'start' + ' -> ' +
            this.ExpectedTableName + 'expected:' + item.modifiedColumnName + 'end' + '[label="' + item.viewQuery + '"]' + '; ';
        }
      }
    }
    if (tempObj.columnList.length !== 0) {
      for (const item of tempObj.columnList.filter(a => a.isSelected === true && a.dataType === 'USERDEFINED')) {
        const a = JSON.parse(item.userColumnQuery.replace(/'/g, '"'));
        for (const list of a) {
          this.dotString = this.dotString + this.selectedTableName + 'original:' + list.column + 'start' + ' -> ' +
            this.ExpectedTableName + 'expected:' + item.modifiedColumnName + 'end' + '[label="' + item.viewQuery + '"]' + '; ';
        }
      }
    }

    this.dotString = this.dotString + '}';
    this.drawTableRelationship();
  }

  drawTableRelationship() {
    this.graphInstance = graphviz('#graph', this.option).transition(this.transitionFactory)
      .tweenShapes(false).attributer(this.attributer).renderDot(this.dotString);
    this.resetZoom();
  }

  resetZoom() {
    graphviz('#graph', this.option).resetZoom(d3.transition().duration(1000));
  }

  attributer(datum, index, nodes) {
    const selection = d3.select(this);
    if (datum.tag === 'svg') {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const x = 200;
      const y = 20;
      const scale = 2;
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

  showDataRecordAndSIPGraph() {
    this.data = this.ertService.data;
    this.selectedValues = this.ertService.selectedValues;
    this.joinListMap = this.ertService.joinListMap;
    this.tempdata = getERTSummaryPageGraphDataRecord(this.selectedValues, this.joinListMap); // passing tempdata in update function.
    this.ShowDiagram = false;
    this.createchart();
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
    const svg = d3.select('body app-root app-workspace-landing-page app-ert-landing-page #ert-landing-id .container-fluid app-ert-table-column-config #ert-table-id .row .col-md-9 .card')
      .append('svg')
      .call(d3.zoom().scaleExtent([1 / 2, 8]).on('zoom', zoomed))
      .append('g')
      .attr('transform', 'translate(40,0)');

    // tslint:disable-next-line: max-line-length
    const div = d3.select('body app-root app-workspace-landing-page app-ert-landing-page #ert-landing-id .container-fluid app-ert-table-column-config #ert-table-id .row .col-md-9 .card').append('div')
      .attr('class', 'tooltipd3')
      .style('opacity', 0);

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(function (d: any) { return d.id; }).distance(100).strength(0.5)) // distance & strength added
      .force('charge', d3.forceManyBody().distanceMax(300).strength(-1000)) // added min, stength default:-15
      .force('center', d3.forceCenter(width / 2, height / 4))
      .on('tick', ticked);

    // update starts
    function update(data) {
      console.log(data, 'inside update');
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

    update(this.tempdata);
  }




}







