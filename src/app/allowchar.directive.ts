import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAllowchar]'
})
export class AllowcharDirective {
  regexStr = '[-A-Za-z 0-9._]';
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
