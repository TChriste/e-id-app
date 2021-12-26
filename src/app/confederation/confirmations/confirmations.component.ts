import { Component, OnInit } from '@angular/core';
import { ConfederationService } from 'src/app/services/trusted-authority.service';

@Component({
  selector: 'app-confirmations',
  templateUrl: './confirmations.component.html',
  styleUrls: ['./confirmations.component.scss']
})
export class ConfirmationsComponent implements OnInit {

  confirmations: any[] = [];

  constructor(private _confederationService: ConfederationService) { }

  ngOnInit(): void {
    this._confederationService.getRecords('request-received').subscribe((records) => {
      this.confirmations = records.results;
    });
  }

  valider(cred_ex_id: string): void {
    console.log(cred_ex_id);
    this._confederationService.issueCredential(cred_ex_id).subscribe((value) => {
      console.log('reponse', value);
    });
  }

  getAttributeValue(confirmation: any, attributeName: string): string{
    const attributes: any[] = confirmation?.cred_ex_record?.cred_preview?.attributes
    return attributes.filter(a => a.name === attributeName)[0].value;
  }

}
