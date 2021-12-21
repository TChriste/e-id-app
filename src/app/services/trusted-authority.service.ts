import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import ConnectionInterface from "../interfaces/ConnectionInterface";

@Injectable({
  providedIn: 'root',
})
export class TrustedAuthorityService {

  private ROOT_URL = 'http://127.0.0.1:8021';

  constructor(
    private http: HttpClient
  ) {}

  getConnections() {
    return this.http.get<ConnectionInterface[]>(this.ROOT_URL + '/connections');
  }

}
