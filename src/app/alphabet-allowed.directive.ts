import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphabetAllowed]'
})
export class AlphabetAllowedDirective {

  regexStr = '[a-zA-Z ]';
  @Input() isAlphaNumeric: boolean;

  constructor(private el: ElementRef) { }

  @HostListener('keypress', ['$event']) onKeyPress(event) {
    const value = new RegExp(this.regexStr).test(event.key);
    if (value) {
      return true;
    } else {
      return false;
    }
  }

}
