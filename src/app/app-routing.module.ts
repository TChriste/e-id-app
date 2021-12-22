import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {TrustedAuthorityConnexionsComponent} from "./trusted-authority-connexions/trusted-authority-connexions.component";
import {HomeComponent} from "./home/home.component";
import {TrustedAuthorityInvitationsComponentComponent} from "./trusted-authority-invitations-component/trusted-authority-invitations-component.component";
import {SideNavComponent} from "./side-nav/side-nav.component";
import { WalletComponent } from './user/wallet/wallet.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: {trustedAuthority: false} },
  {
    path: 'confederation',
    component: SideNavComponent,
    data: {
      trustedAuthority: true
    },
    children: [
      { path: 'connexions', component: TrustedAuthorityConnexionsComponent },
      { path: 'invitations', component: TrustedAuthorityInvitationsComponentComponent },
    ]
  },
  {
    path: 'user',
    component: SideNavComponent,
    data: {
      trustedAuthority: true
    },
    children: [
      { path: 'wallet', component: WalletComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
