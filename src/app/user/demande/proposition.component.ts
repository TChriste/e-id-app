import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import ProposalInterface from 'src/app/interfaces/ProposalInterface';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-proposition',
  templateUrl: './proposition.component.html',
  styleUrls: ['./proposition.component.scss']
})
export class PropositionComponent implements OnInit, OnDestroy {

  form = new FormGroup({
    nom: new FormControl(),
    prenom: new FormControl(),
    age: new FormControl(),
  });

  private readonly _unsubscribe$: Subject<void> = new Subject();
  
  constructor(private _userService: UserService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  valider(): void {
    console.log(this.form);

    let proposal: ProposalInterface = {
      "auto_remove": true,
      "comment": "",
      "connection_id": "9c63a770-5045-4c85-9da1-467377545202",
      "credential_preview": {
        "@type": "issue-credential/2.0/credential-preview",
        "attributes": [
          {
            "mime-type": "plain/text",
            "name": "age", 
            "value": "20"
          },
          {
            "mime-type": "plain/text",
            "name": "nom", 
            "value": "Schmidt"
          }
        ]
      },
      "filter": {
        "indy": {
          "cred_def_id": "V1i1ptWQmQQCMrHQDz2PEe:3:CL:9:default",
          "schema_id": "V1i1ptWQmQQCMrHQDz2PEe:2:identite:1.0",
          "schema_name": "identite",
          "schema_version": "1.0"
        }
      },
      "trace": true
    }


    this._userService.sendProposal(proposal)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((value) => {
          console.log('Proposal result', value);
        });
  }
}
