import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import ConnectionResultInterface from "../interfaces/ConnectionResultInterface";

@Injectable({
  providedIn: 'root',
})
export class ConfederationService {

  private ROOT_URL = 'http://0.0.0.0:11000';

  constructor(
    private http: HttpClient
  ) {}

  getConnections() {
    return this.http.get<ConnectionResultInterface>(this.ROOT_URL + '/connections');
  }

  getRecords() {
    return this.http.get<any>(this.ROOT_URL + '/issue-credential-2.0/records');
  }

  responseToOffer(cred_ex_id: string): Observable<any> {
    return this.http.post(this.ROOT_URL + '/issue-credential-2.0/records/' + cred_ex_id + '/send-offer', {}).pipe(map((value) => {return value}));
  }

}
