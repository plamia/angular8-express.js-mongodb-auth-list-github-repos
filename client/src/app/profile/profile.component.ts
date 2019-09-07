import { Component } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { GithubService } from '../github.service';

//Utilities
import { NameTypeFilter } from "../utilFlter";


@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  details: UserDetails;
  repos;
  total;
  
  constructor(private auth: AuthenticationService , private githubService: GithubService) {}
  
  ngOnInit() {    
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });

    this.githubService.getRepos().subscribe((data: any) => {
      this.repos = data;
      this.total = data.length;
    });
  }
  private nameTypeFilter = new NameTypeFilter; 
}
