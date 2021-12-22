import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  isTrustedAuthorityPage = false;

  constructor(route: ActivatedRoute) {
    route.url.subscribe(() => {
      console.log(route?.snapshot?.firstChild?.data['trustedAuthority']);
      this.isTrustedAuthorityPage = route?.snapshot?.firstChild?.data['trustedAuthority'];
     });
  }

  ngOnInit(): void {
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
