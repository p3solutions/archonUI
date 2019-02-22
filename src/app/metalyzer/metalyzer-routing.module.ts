import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MetalyzerLandingPageComponent } from './metalyzer-landing-page/metalyzer-landing-page.component';
import { MetalyzerConfigurationComponent } from './metalyzer-configuration/metalyzer-configuration.component';
import { DataAnalyzerResultScreenComponent } from './data-analyzer-result-screen/data-analyzer-result-screen.component';
import { TableListComponent } from './table-list/table-list.component';

const routes: Routes = [
  {
    path: '', component: MetalyzerLandingPageComponent, children: [
      {
        path: 'configuration', component: MetalyzerConfigurationComponent
      }, {
        path: 'analysis', component: TableListComponent, children: [
          {
            path: 'resultant', component: DataAnalyzerResultScreenComponent
          }]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetalyzerRoutingModule { }
