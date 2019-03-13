import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchColumn } from '../adhoc-landing-page/adhoc';
import { AdhocScreenService } from '../adhoc-search-criteria/adhoc-screen.service';
import { Router } from '@angular/router';
import { AdhocService } from '../adhoc-landing-page/adhoc.service';

@Component({
  selector: 'app-adhoc-search-panel',
  templateUrl: './adhoc-search-panel.component.html',
  styleUrls: ['./adhoc-search-panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdhocSearchPanelComponent implements OnInit {
  tabs = ['Tab1'];
  selected = 0;
  @ViewChild('tabGroup') tabGroup;
  panelColumns: SearchColumn[];
  @Output() voted = new EventEmitter<string>();

  constructor(private adhocScreenService: AdhocScreenService,
    private router: Router, private adhocService: AdhocService) { }

  ngOnInit() {
    this.adhocScreenService.updatedPanelColumns.subscribe(result => {
      this.panelColumns = JSON.parse(JSON.stringify(result));
    });
  }


  addTab() {
    this.tabs.push('Tab' + this.tabs.length + 1);
    this.selected = this.tabs.length - 1;
  }

  setInlinePanel() {
    this.selected = this.tabs.length - 1;
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  tabChange(tabChangeEvent) {
    this.voted.emit('change');
    console.log(tabChangeEvent.index);
  }
}
