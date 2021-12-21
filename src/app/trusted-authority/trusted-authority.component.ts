import { Component, OnInit } from '@angular/core';
import ConnectionInterface from "../interfaces/ConnectionInterface";

@Component({
  selector: 'app-trusted-authority',
  templateUrl: './trusted-authority.component.html',
  styleUrls: ['./trusted-authority.component.scss']
})
export class TrustedAuthorityComponent implements OnInit {

  panelOpenState = true;
  connections: ConnectionInterface[] = [];

  constructor() { }

  ngOnInit(): void {
    this.connections.push({
      dateCreation: new Date(),
      nom: "Smith",
      prenom: "Alice",
      statut: "Actif"
    });
    this.connections.push({
      dateCreation: new Date(),
      nom: "Smith2",
      prenom: "Alice2",
      statut: "Actif2"
    });
  }

}
