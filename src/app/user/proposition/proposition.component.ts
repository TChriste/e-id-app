import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import ConnectionInterface from 'src/app/interfaces/ConnectionInterface';
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
    genre: new FormControl(),
    age: new FormControl(),
    taille: new FormControl(),
    origine: new FormControl()
  });

  private readonly _unsubscribe$: Subject<void> = new Subject();

  private SCHEMA_ID: string = "V1i1ptWQmQQCMrHQDz2PEe:2:identite:1.1";
  private SCHEMA_CRED_DEF_ID: string = "V1i1ptWQmQQCMrHQDz2PEe:3:CL:11:default";
  private SCHEMA_NAME: string = "identite";
  private SCHEMA_VERSION: string = "1.1";

  
  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  valider(): void {
    this._userService.getConnections().subscribe(( connexions )=> {
      if (connexions.results && connexions.results.length >= 1) {
        const derniereConnexion: ConnectionInterface = connexions.results[connexions.results.length - 1];
        const comment = "Proposition pour " + this.form?.value?.prenom;
        
        let proposal: ProposalInterface = {
          "auto_remove": true,
          "comment": comment,
          "connection_id": derniereConnexion.connection_id,
          "credential_preview": {
            "@type": "issue-credential/2.0/credential-preview",
            "attributes": [
              {
                "mime-type": "plain/text",
                "name": "age", 
                "value": this.form?.value?.age
              },
              {
                "mime-type": "plain/text",
                "name": "nom", 
                "value": this.form?.value?.nom
              },
              {
                "mime-type": "plain/text",
                "name": "prenom", 
                "value": this.form?.value?.prenom
              },
              {
                "mime-type": "plain/text",
                "name": "genre", 
                "value": this.form?.value?.genre
              },
              {
                "mime-type": "plain/text",
                "name": "taille", 
                "value": this.form?.value?.taille
              },
              {
                "mime-type": "plain/text",
                "name": "origine", 
                "value": this.form?.value?.origine
              }
            ]
          },
          "filter": {
            "indy": {
              "cred_def_id": this.SCHEMA_CRED_DEF_ID,
              "schema_id": this.SCHEMA_ID,
              "schema_name": this.SCHEMA_NAME,
              "schema_version": this.SCHEMA_VERSION
            }
          },
          "trace": true
        }

        this._userService.sendProposal(proposal)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((value) => {
          console.log('Proposal result', value);
          this._router.navigate(['/user/confirmation']);  
        });

      } else {
        console.log('Aucune connexion !');
      }
      
    })
  }
}
