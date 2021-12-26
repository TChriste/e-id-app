import { Component, OnInit } from '@angular/core';
import { ConfederationService } from 'src/app/services/trusted-authority.service';

@Component({
  selector: 'app-propositions',
  templateUrl: './propositions.component.html',
  styleUrls: ['./propositions.component.scss']
})
export class PropositionsComponent implements OnInit {

  propositions: any[] = [];

  constructor(private _trustedAuthorityService: ConfederationService) { }

  ngOnInit(): void {
    this._trustedAuthorityService.getRecords().subscribe((records) => {
      // TODO : Filtrer sur "state": "proposal-received" pour éviter de tous les avoirs (même les déjà validés)
      this.propositions = records.results;
      console.log('proposition', this.propositions);
    })
  }

  valider(cred_ex_id: string): void {
    console.log(cred_ex_id);
    this._trustedAuthorityService.responseToOffer(cred_ex_id).subscribe((value) => {
      console.log('reponse', value);
    });
  }

  getAttributeValue(proposition: any, attributeName: string): string{
    const attributes: any[] = proposition?.cred_ex_record?.cred_preview?.attributes
    return attributes.filter(a => a.name === attributeName)[0].value;
  }
}
