import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router
  ) {}

  redirectToRegister(): void {
    this.router.navigate(['./signup']);
  }

  redirectToLogin(): void {
    
  }

  ngOnInit() {
  }

}
