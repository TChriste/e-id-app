import { Component, OnInit } from '@angular/core';
import ConnectionInterface from "../interfaces/ConnectionInterface";
import {ConfederationService} from "../services/trusted-authority.service";

@Component({
  selector: 'app-trusted-authority-connexions',
  templateUrl: './trusted-authority-connexions.component.html',
  styleUrls: ['./trusted-authority-connexions.component.scss']
})
export class TrustedAuthorityConnexionsComponent implements OnInit {

  panelOpenState = true;
  connections: ConnectionInterface[] = [];

  constructor(
    private _trustedAuthorityService: ConfederationService
  ) { }

  ngOnInit(): void {
    this._trustedAuthorityService.getConnections().subscribe((connections) => {
      this.connections = connections.results;
    });
  }
}
