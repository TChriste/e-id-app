import {Component, OnInit} from '@angular/core';
import {Router, RoutesRecognized} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'e-id-app';

  public constructor() {
  }

  ngOnInit() {
  }

}
