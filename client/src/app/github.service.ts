import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  url = 'api';

  constructor(private http: HttpClient) { }

  public getRepos() {
    return this.http.get(`${this.url}/pinnedRepos`);
  }

  public getRepoGeneralInfo(name) {
    return this.http.get(`${this.url}/generalInfo/${name}`);
  }

  public getRepoCommits(name) {
    return this.http.get(`${this.url}/commits/${name}`);
  }

  public getPatch(name, id) {
    return this.http.get(`${this.url}/patch/${name}/${id}`);
  }

}
