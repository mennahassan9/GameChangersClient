import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class DefaultGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    console.log('##############################')
    console.log('##############################')
    console.log(this.auth.isAuthenticated(), this.auth.isJudge())
    if (this.auth.isAuthenticated() && this.auth.isJudge()) {
      this.router.navigate(['./judge']);
      return false;
    }else{
        if (this.auth.isAuthenticated() && this.auth.isUser()) {
            this.router.navigate(['./profile']);
            return false;
          }
    }
    return true;
  }
}