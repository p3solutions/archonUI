import { ComponentFactoryResolver, Injectable, Inject, ReflectiveInjector, ViewContainerRef } from '@angular/core';
import { NewWorkspaceComponent } from './new-workspace/new-workspace.component';
import { AddDatabaseWizardComponent } from './add-database-wizard/add-database-wizard.component';
import { StoredProcViewComponent } from './stored-proc-view/stored-proc-view.component';
@Injectable()
export class DynamicLoaderService {

  factoryResolver: ComponentFactoryResolver;
  rootViewContainer: ViewContainerRef ;

  constructor(@Inject(ComponentFactoryResolver) factoryResolver) {
    this.factoryResolver = factoryResolver;
   }

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  addDynamicComponent() {
    const factory = this.factoryResolver
      .resolveComponentFactory(NewWorkspaceComponent);
    const component = factory
      .create(this.rootViewContainer.parentInjector);
    this.rootViewContainer.insert(component.hostView);
  }
  addDynamicComponent1() {
    const factory = this.factoryResolver
      .resolveComponentFactory(AddDatabaseWizardComponent);
    const component = factory
      .create(this.rootViewContainer.parentInjector);
    this.rootViewContainer.insert(component.hostView);
  }
  addStoredProcViewDynamicComponent(tableName:string) {
    const factory = this.factoryResolver
      .resolveComponentFactory(StoredProcViewComponent);
    const component = factory
      .create(this.rootViewContainer.parentInjector);
    this.rootViewContainer.insert(component.hostView);
    component.instance.tableName=tableName;
  }
  

}
