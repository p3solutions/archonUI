import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appMetalyzerLive]'
})
export class MetalyzerLiveDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
