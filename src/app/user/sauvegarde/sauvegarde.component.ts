import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sauvegarde',
  templateUrl: './sauvegarde.component.html',
  styleUrls: ['./sauvegarde.component.scss']
})
export class SauvegardeComponent implements OnInit {

  identifiants: any[] = [];

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit(): void {
    this._userService.getRecords('credential-received').subscribe((records) => {
      this.identifiants = records.results;
    });
  }

  valider(cred_ex_id: string): void {
    this._userService.storeCredential(cred_ex_id).subscribe((value) => {
      console.log('reponse', value);
      this._router.navigate(['/user/wallet']);
    });
  }

  getAttributeValue(proposition: any, attributeName: string): string{
    const attributes: any[] = proposition?.cred_ex_record?.cred_preview?.attributes;
    return attributes.filter(a => a.name === attributeName)[0].value;
  }

}
