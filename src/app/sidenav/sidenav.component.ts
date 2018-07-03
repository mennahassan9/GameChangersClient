import { Component, OnInit } from '@angular/core';
import { HeaderButtonsService } from '../Services/headerButtons.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor( private headerButtonsService: HeaderButtonsService) { }

  ngOnInit() {
    this.headerButtonsService.isSignedIn.subscribe(updateSignIn => {
      
    });
  }

}
