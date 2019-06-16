import { Component, OnInit } from '@angular/core';
import { HeaderButtonsService } from '../Services/headerButtons.service';

@Component({
  selector: 'app-leader-side-nav',
  templateUrl: './leader-side-nav.component.html',
  styleUrls: ['./leader-side-nav.component.css']
})
export class LeaderSideNavComponent implements OnInit {

  constructor(private headerButtonsService: HeaderButtonsService) { }

  ngOnInit() {
    this.headerButtonsService.isSignedIn.subscribe(updateSignIn => {
      
    });
  }

}
