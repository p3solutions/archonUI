import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './search/search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    SearchPipe,
  ],
  imports: [
    CommonModule,
    NgxPaginationModule
  ],
  exports: [
    SearchPipe, NgxPaginationModule
  ]
})
export class UtilityModule { }
