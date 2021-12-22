import { Component, OnInit } from '@angular/core';
import CredentialsInterface from 'src/app/interfaces/CredentialsInterface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  credientals: CredentialsInterface[] = [];


  constructor(
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this._userService.getCredentials().subscribe((credientals) => {
      this.credientals = credientals.results
    })
  }

}
