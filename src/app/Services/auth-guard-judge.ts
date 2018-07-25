import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardJudgeService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated() || !this.auth.isJudge()) {
      this.router.navigate(['./unauthorized']);
      return false;
    }
    return true;
  }
}
