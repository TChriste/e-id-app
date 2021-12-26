import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
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
    forkJoin([
      this._confederationService.getRecords('request-received'),
      this._confederationService.getRecords('credential-issued')
    ]).subscribe((result) => {
      for (var i = 0; i < result[0].results.length; i++) {
        result[0].results[i]['statut'] = 'request-received';
        this.confirmations.push(result[0].results[i]);
      }
      for (var i = 0; i < result[1].results.length; i++) {
        result[1].results[i]['statut'] = 'credential-issued';
        this.confirmations.push(result[1].results[i]);
      }
    });   
  }

  valider(cred_ex_id: string): void {
    console.log(cred_ex_id);
    this._confederationService.issueCredential(cred_ex_id).subscribe((value) => {
      console.log('reponse', value);
      location.reload();
    });
  }

  getAttributeValue(confirmation: any, attributeName: string): string{
    const attributes: any[] = confirmation?.cred_ex_record?.cred_preview?.attributes
    return attributes.filter(a => a.name === attributeName)[0].value;
  }

}
