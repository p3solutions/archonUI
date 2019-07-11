import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appPreventcopy]'
})
export class PreventcopyDirective {

  constructor() { }

  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('drop', ['$event']) blockDrop(e: KeyboardEvent) {
    e.preventDefault();
  }

}
