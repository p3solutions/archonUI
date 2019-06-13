import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {

    // reference for global renderer // do not delete
    this.renderer.listen('document', 'click', (evt) => {
      // const ele = document.getElementsByTagName('body')[0];
      // ele.classList.remove('overlayclass');
      // console.log('Clicking the document', evt);
    });
  }
}
