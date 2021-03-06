import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import CredentialsResultInterface from "../interfaces/CredentialsResultInterface";
import ProposalInterface from "../interfaces/ProposalInterface";
import { map } from 'rxjs/operators';
import ConnectionResultInterface from "../interfaces/ConnectionResultInterface";

@Injectable({
    providedIn: 'root',
  })
export class UserService {
    private ROOT_URL = 'http://0.0.0.0:11001';

    constructor(
      private http: HttpClient
    ) {}

    getConnections() {
      return this.http.get<ConnectionResultInterface>(this.ROOT_URL + '/connections');
    }

    getRecords(state: string) {
      let queryURL: string  = this.ROOT_URL + '/issue-credential-2.0/records'; 
      if (state){
        queryURL += '?state=' + state;
      }
      return this.http.get<any>(queryURL);
    }

    sendProposal(proposal: ProposalInterface): Observable<ProposalInterface> {  
      return this.http.post<ProposalInterface>(this.ROOT_URL + '/issue-credential-2.0/send-proposal', proposal).pipe(map(( value ) => {return value}));
    }

    requestCredential(cred_ex_id: string): Observable<any> {
      return this.http.post(this.ROOT_URL + '/issue-credential-2.0/records/' + cred_ex_id + '/send-request', {}).pipe(map((value) => {return value}));
    }

    storeCredential(cred_ex_id: string): Observable<any> {
      return this.http.post(this.ROOT_URL + '/issue-credential-2.0/records/' + cred_ex_id + '/store', {}).pipe(map((value) => {return value}));
    }
  
    getCredentials() {  
      return this.http.get<CredentialsResultInterface>(this.ROOT_URL + '/credentials');
    }
}