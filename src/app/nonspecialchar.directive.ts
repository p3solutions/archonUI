import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNonspecialchar]'
})
export class NonspecialcharDirective {

  regexStr = '^[a-zA-Z0-9_]*$';
  @Input() isAlphaNumeric: boolean;

  constructor(private el: ElementRef) { }


  @HostListener('keypress', ['$event']) onKeyPress(event) {
    const value = new RegExp(this.regexStr).test(event.key);
    if (value) {
      setTimeout(() => {
        const a = /^[0-9]/.test(event.target.value);
        if (a) {
          this.el.nativeElement.value = '';
        } else {
          const b = /^[a-zA-Z_][a-zA-Z0-9_]*/.test(event.target.value);
          if (b) {
            this.el.nativeElement.value = event.target.value;
          }
        }
      }, 100);
    } else {
      return false;
    }
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }

  validateFields(event) {
    setTimeout(() => {

      this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^A-Za-z ]/g, '').replace(/\s/g, '');
      event.preventDefault();

    }, 100);
  }
}
