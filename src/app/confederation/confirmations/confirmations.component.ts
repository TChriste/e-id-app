import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmations',
  templateUrl: './confirmations.component.html',
  styleUrls: ['./confirmations.component.scss']
})
export class ConfirmationsComponent implements OnInit {

  confirmations: string[] = ["test"];

  constructor() { }

  ngOnInit(): void {
  }

}
