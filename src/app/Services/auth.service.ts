import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
@Injectable()
export class AuthService {
    constructor(private localStorageService: LocalStorageService) { }

    public isAuthenticated(): boolean {
        const token = this.localStorageService.get('token');
        console.log(token);
        if (token) return true;
        return false;

    }
}