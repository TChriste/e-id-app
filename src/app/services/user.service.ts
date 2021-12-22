import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import CredentialsResultInterface from "../interfaces/CredentialsResultInterface";

@Injectable({
    providedIn: 'root',
  })
export class UserService {
    private ROOT_URL = 'http://127.0.0.1:8031';

    constructor(
      private http: HttpClient
    ) {}
  
    getCredentials() {  
      return this.http.get<CredentialsResultInterface>(this.ROOT_URL + '/credentials');
    }
}