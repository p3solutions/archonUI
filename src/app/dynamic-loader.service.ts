import { ComponentFactoryResolver, Injectable, Inject, ReflectiveInjector, ViewContainerRef } from '@angular/core';
import { NewWorkspaceComponent } from './new-workspace/new-workspace.component';
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
    console.log('factory', factory);
    const component = factory
      .create(this.rootViewContainer.parentInjector);
    console.log('component', component);
    this.rootViewContainer.insert(component.hostView);
    console.log('rootViewContainer', this.rootViewContainer);
  }
}
