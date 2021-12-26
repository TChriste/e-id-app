import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-confirmation-utilisateur',
  templateUrl: './confirmation-utilisateur.component.html',
  styleUrls: ['./confirmation-utilisateur.component.scss']
})
export class ConfirmationUtilisateurComponent implements OnInit {

  confirmations: any[] = [];

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit(): void {
    this._userService.getRecords('offer-received').subscribe((records) => {
      this.confirmations = records.results;
    });
  }

  valider(cred_ex_id: string): void {
    this._userService.requestCredential(cred_ex_id).subscribe((value) => {
      console.log('reponse', value);
      this._router.navigate(['/user/sauvegarde']);
    });
  }

  getAttributeValue(proposition: any, attributeName: string): string{
    const attributes: any[] = proposition?.cred_ex_record?.cred_preview?.attributes;
    return attributes.filter(a => a.name === attributeName)[0].value;
  }
}
