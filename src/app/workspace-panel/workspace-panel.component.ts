import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-workspace-panel',
  templateUrl: './workspace-panel.component.html',
  styleUrls: ['./workspace-panel.component.css']
})
export class WorkspacePanelComponent implements OnInit {
  // this.route.data
  // .subscribe((data: { crisis: Crisis }) => {
  //   this.editName = data.crisis.name;
  //   this.crisis = data.crisis;
  // });

  componentTitle: String = 'chandruashiwn';
  sub: any;
  constructor(private route: ActivatedRoute) {
    // this.route.data.subscribe((data => {
    //   console.log('data',data);
    // }));
  //  this.componentTitle = this.route.snapshot.paramMap.get('title');

   }

  ngOnInit() {
    // this.function();
    // this.sub= this.routes.data.subscribe((data) => {
    //   this.componentTitle = data.title;
    // });
    // this.router.events
    // .subscribe(() => {
    //     var root = this.router.routerState.snapshot.root;
    //     while (root) {
    //         if (root.children && root.children.length) {
    //             root = root.children[0];
    //         } else if (root.data && root.data["title"]) {
    //             this.componentTitle = root.data["title"];
    //             return;
    //         } else {
    //             return;
    //         }
    //     }
    // });
    // this.sub = this.route.snapshot.params['title'];
    // console.log(this.sub+"**");
    // this.route.paramMap.subscribe(params => {
    //   this.componentTitle = params.get('title');
    //   console.log("********"+this.componentTitle);
    // });
//     this.route.data
//     .subscribe((data) => {
//       this.componentTitle = data.title;
// //      this.crisis = data.crisis;
//     });
  }

}
