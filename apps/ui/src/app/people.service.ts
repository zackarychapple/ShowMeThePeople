import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class PeopleService {
  headers: HttpHeaders = new HttpHeaders({'Authorization': PUT_TOKEN_HERE);

  constructor(private http: HttpClient) {
  }

  getPeople() {
    return this.http.get('/api/people.json?include_paging_counts=true', {headers: this.headers})
  }
}
