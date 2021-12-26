import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfederationService } from 'src/app/services/trusted-authority.service';

@Component({
  selector: 'app-propositions',
  templateUrl: './propositions.component.html',
  styleUrls: ['./propositions.component.scss']
})
export class PropositionsComponent implements OnInit {

  propositions: any[] = [];

  constructor(private _trustedAuthorityService: ConfederationService, private _router: Router) { }

  ngOnInit(): void {
    this._trustedAuthorityService.getRecords('proposal-received').subscribe((records) => {
      this.propositions = records.results;
      console.log('propositions', this.propositions);
    })
  }

  valider(cred_ex_id: string): void {
    console.log(cred_ex_id);
    this._trustedAuthorityService.responseToOffer(cred_ex_id).subscribe((value) => {
      console.log('reponse', value);
      this._router.navigate(['/confederation/confirmations']);
    });
  }

  getAttributeValue(proposition: any, attributeName: string): string{
    const attributes: any[] = proposition?.cred_ex_record?.cred_preview?.attributes
    return attributes.filter(a => a.name === attributeName)[0].value;
  }
}
