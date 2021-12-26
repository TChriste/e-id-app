import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrustedAuthorityConnexionsComponent } from './trusted-authority-connexions/trusted-authority-connexions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './home/home.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatExpansionModule} from "@angular/material/expansion";
import { TrustedAuthorityInvitationsComponentComponent } from './trusted-authority-invitations-component/trusted-authority-invitations-component.component';
import {HttpClientModule} from "@angular/common/http";
import { WalletComponent } from './user/wallet/wallet.component';
import { PropositionComponent } from './user/proposition/proposition.component';
import { PropositionsComponent } from './confederation/propositions/propositions.component';
import { ConfirmationUtilisateurComponent } from './user/confirmation-utilisateur/confirmation-utilisateur.component';
import { ConfirmationsComponent } from './confederation/confirmations/confirmations.component';
import { SauvegardeComponent } from './user/sauvegarde/sauvegarde.component';

@NgModule({
  declarations: [
    AppComponent,
    TrustedAuthorityConnexionsComponent,
    HomeComponent,
    SideNavComponent,
    TrustedAuthorityInvitationsComponentComponent,
    WalletComponent,
    PropositionComponent,
    PropositionsComponent,
    ConfirmationUtilisateurComponent,
    ConfirmationsComponent,
    SauvegardeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
