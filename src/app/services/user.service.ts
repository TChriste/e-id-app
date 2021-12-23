import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import CredentialsResultInterface from "../interfaces/CredentialsResultInterface";
import ProposalInterface from "../interfaces/ProposalInterface";
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
  })
export class UserService {
    private ROOT_URL = 'http://127.0.0.1:8031';

    constructor(
      private http: HttpClient
    ) {}

    sendProposal(proposal: ProposalInterface): Observable<ProposalInterface> {  
      return this.http.post<ProposalInterface>(this.ROOT_URL + '/issue-credential-2.0/send-proposal', proposal).pipe(map(( value ) => {return value}));
    }
  
    getCredentials() {  
      return this.http.get<CredentialsResultInterface>(this.ROOT_URL + '/credentials');
    }
}