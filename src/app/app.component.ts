import {Component, OnInit} from '@angular/core';
import {Router, RoutesRecognized} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'e-id-app';
  isTrustedAuthorityPage = false;

  public constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        const route = event.state.root.firstChild;
        if (route && route.data['trustedAuthority']) {
          this.isTrustedAuthorityPage = route.data['trustedAuthority'];
        }
      }
    });
  }

}
