import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {TrustedAuthorityComponent} from "./trusted-authority/trusted-authority.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  { path: '', component: HomeComponent, data: {trustedAuthority: false} },
  { path: 'confederation', component: TrustedAuthorityComponent, data: {trustedAuthority: true}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
