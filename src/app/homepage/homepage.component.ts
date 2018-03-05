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

  // redirection to the registration page
  redirectToRegister(): void {
    this.router.navigate(['./signup']);
  }

  // redirection to the log-in page
  redirectToLogin(): void {
    this.router.navigate(['./signin']);
  }

  ngOnInit() {}
}
