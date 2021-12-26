import { Component, OnInit } from '@angular/core';
import CredentialsInterface from 'src/app/interfaces/CredentialsInterface';
import { UserService } from 'src/app/services/user.service';
import { avatar } from 'src/avatar';

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

  avatarRandom(type: string) {
    return avatar[type][Math.floor(Math.random() * avatar[type].length)];
  }

  ngOnInit(): void {
    this._userService.getCredentials().subscribe((credientals) => {
      this.credientals = credientals.results;
    })
  }

  getAvatar() {
    return 'https://avataaars.io/?avatarStyle=Circle&topType=' + this.avatarRandom('topType') +
      '&accessoriesType=' + this.avatarRandom('accessoriesType') + '&hairColor=' + this.avatarRandom('hairColor') +
      '&facialHairType=' + this.avatarRandom('facialHairType') + '&clotheType=' + this.avatarRandom('clotheType') +
      '&eyeType=' + this.avatarRandom('eyeType') + '&eyebrowType=' + this.avatarRandom('eyebrowType') +
      '&mouthType=' + this.avatarRandom('mouthType') + '&skinColor=' + this.avatarRandom('skinColor');
  }

}
