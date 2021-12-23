import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-utilisateur',
  templateUrl: './confirmation-utilisateur.component.html',
  styleUrls: ['./confirmation-utilisateur.component.scss']
})
export class ConfirmationUtilisateurComponent implements OnInit {

  confirmations: string[] = ["test"];

  constructor() { }

  ngOnInit(): void {
  }

}
