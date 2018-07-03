import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class HeaderButtonsService {
    public isSignedIn = new BehaviorSubject(false);
    public isAdmin = new BehaviorSubject(false);
    constructor() { }

    setIsSignedIn() {
        this.isSignedIn.next(true);
    }

    signOut()
    {
        this.isSignedIn.next(false); 
    }

    setIsSignedInAdmin() {
        this.isAdmin.next(true);
    }

    signOutAdmin()
    {
        this.isAdmin.next(false); 
    }
}