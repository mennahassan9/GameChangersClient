import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class HeaderButtonsService {
    public isSignedIn = new BehaviorSubject(false);
    public isAdmin = new BehaviorSubject(false);
    public isCleader = new BehaviorSubject(false)
    public isRleader = new BehaviorSubject(false)
    public isGleader = new BehaviorSubject(false)

    constructor() { }

    setIsSignedIn() {
        this.isSignedIn.next(true);
    }

    signOut()
    {
        this.isSignedIn.next(false); 
    }

    setIsSignedInCLeader() {
        this.isCleader.next(true);
    }
    setIsSignedInRLeader() {
        this.isRleader.next(true);
    }
    setIsSignedInGLeader() {
        this.isGleader.next(true);
    }
    setIsSignedInAdmin() {
        this.isAdmin.next(true);
    }

    signOutAdmin()
    {
        this.isAdmin.next(false); 
    }
    signOutLeader(){
        this.isCleader.next(false);
        this.isRleader.next(false);
        this.isGleader.next(false);
    }
}