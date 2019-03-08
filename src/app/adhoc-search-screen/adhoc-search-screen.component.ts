import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AdhocScreenService } from '../adhoc-search-criteria/adhoc-screen.service';
import { SearchColumn } from '../adhoc-landing-page/adhoc';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adhoc-search-screen',
  templateUrl: './adhoc-search-screen.component.html',
  styleUrls: ['./adhoc-search-screen.component.css']
})
export class AdhocSearchScreenComponent implements OnInit {
  searchColumns: SearchColumn[];

  constructor(private adhocScreenService: AdhocScreenService,
    private router: Router) { }

  ngOnInit() {
    this.adhocScreenService.updatedSearchColumns.subscribe(result => {
      this.searchColumns = result;
    });
  }

  gotoSearchColumnEdit(columnName) {
    const temp = this.searchColumns.find(a => a.columnName === columnName);
    this.adhocScreenService.updateSearchColumn(temp);
    this.router.navigate(['/workspace/adhoc/screen/search/column-edit']);
  }
}
