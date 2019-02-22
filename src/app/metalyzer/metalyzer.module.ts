// Libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Modules
import { UtilityModule } from '../utility/utility.module';

// Routings
import { MetalyzerRoutingModule } from './metalyzer-routing.module';

// Components
import { MetalyzerContainerComponent } from './metalyzer-container/metalyzer-container.component';
import { MetalyzerLandingPageComponent } from './metalyzer-landing-page/metalyzer-landing-page.component';
import { MetalyzerHeaderComponent } from './metalyzer-header/metalyzer-header.component';
import { MetalyzerConfigurationComponent } from './metalyzer-configuration/metalyzer-configuration.component';
import { TableListComponent } from './table-list/table-list.component';
import { DataAnalyzerResultScreenComponent } from './data-analyzer-result-screen/data-analyzer-result-screen.component';
import { AddDirectJoinComponent } from './add-direct-join/add-direct-join.component';
import { EditRelationshipInfoComponent } from './edit-relationship-info/edit-relationship-info.component';

// Services
import { MetalyzerHeaderService } from './metalyzer-header/metalyzer-header.service';
import { TableListService } from './table-list/table-list.service';
import { AddDirectJoinService } from './add-direct-join/add-direct-join.service';
import { EditRelationshipInfoService } from './edit-relationship-info/edit-relationship-info.service';

// Pipes
import { SecondaryColumnPipe } from '../secondary-column.pipe';

@NgModule({
  declarations: [
    MetalyzerContainerComponent,
    MetalyzerLandingPageComponent,
    MetalyzerHeaderComponent,
    MetalyzerConfigurationComponent,
    TableListComponent,
    DataAnalyzerResultScreenComponent,
    AddDirectJoinComponent,
    EditRelationshipInfoComponent,
    SecondaryColumnPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    UtilityModule,
    MetalyzerRoutingModule,
  ],
  providers: [
    MetalyzerHeaderService,
    TableListService,
    AddDirectJoinService, EditRelationshipInfoService
  ],
})
export class MetalyzerModule { }
