import { Directive, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Directive({
  selector: '[appChangeOverflow]'
})
export class ChangeOverflowDirective implements OnInit{
  path;

  constructor(  private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.url.subscribe(url => console.log(url[0].path));
    this.route.url.subscribe(url => this.path = url[0].path);
    if (this.path === 'metalyzer') {
      const ele1 = document.getElementsByTagName('body')[0];
      ele1.classList.add('overlayclass');
    }
    const ele = document.getElementsByTagName('body')[0];
    ele.classList.remove('overlayclass');
  }

}
