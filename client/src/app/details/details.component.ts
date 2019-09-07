import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {
  currentRepo;
  route = this.router.url;
  repoCommits;

  constructor(private router: Router, private githubService: GithubService) { }

  ngOnInit() {
    this.currentRepo = this.route.split('/')[2];
    
    this.githubService.getRepoGeneralInfo(this.currentRepo).subscribe((data: any) => {
        let content = document.getElementById("details-content");
        content.innerHTML = data.response;
    });
    this.githubService.getRepoCommits(this.currentRepo).subscribe((data: any) => {
      this.repoCommits = data;
    });
  }

  downloadPatch(patchId) {
    this.githubService.getPatch(this.currentRepo, patchId).subscribe((data: any) => {
      let blob = new Blob([data.response]);
      let a = document.createElement("a");
      a.href = window.URL.createObjectURL(blob);
      a.download = `${this.currentRepo}${patchId}.patch`;
      a.click();
      window.URL.revokeObjectURL(a.href);
    });
  }


}
