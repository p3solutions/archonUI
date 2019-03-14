import { Directive, Output, HostListener, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appScrollServerCall]'
})
export class ScrollServerCallDirective {
  constructor() { }
  @HostListener('scroll')
  onListenerTriggered(event: any): void {
    console.log('hi');
  }
}
