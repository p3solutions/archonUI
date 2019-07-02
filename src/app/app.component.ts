import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor(private renderer: Renderer2, private router: Router) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
  });
  }

  ngOnInit() {

    // reference for global renderer // do not delete
    this.renderer.listen('document', 'click', (evt) => {
      // const ele = document.getElementsByTagName('body')[0];
      // ele.classList.remove('overlayclass');
      // console.log('Clicking the document', evt);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
