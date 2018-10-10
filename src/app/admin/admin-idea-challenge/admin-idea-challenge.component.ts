import { Component, OnInit } from '@angular/core';
import { IdeaChallenge } from './Models/ideaChallengeModel';
import { IdeaChallengeService } from '../../Services/idea-challenge.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-admin-idea-challenge',
  templateUrl: './admin-idea-challenge.component.html',
  styleUrls: ['./admin-idea-challenge.component.css']
})
export class AdminIdeaChallengeComponent implements OnInit {
  challenges: IdeaChallenge[];
  alertFlag: boolean;
  alertMsg: string;
  editFlag:boolean;

  constructor(
    // private router: Router,
    private challengeService: IdeaChallengeService

  ) { }

  ngOnInit() {
    
    this.challengeService.getChallenges().subscribe(res=>{
      console.log(res)
      this.challenges = JSON.parse(res._body)["body"];
      }, e => {
        this.alertFlag=true;
        this.alertMsg="couldn't connect to server"
        this.challenges = [];
    })
  }

  addChallenge(challenge) {

    if(this.challenges.find(chall => chall.name===challenge)!=null){
      this.alertFlag = true;
      this.alertMsg = "The challenge you entered already exists";
    }
    else{

    this.challengeService.addChallenge(challenge).subscribe(res => {
      this.challenges.push({ name: challenge, edit:false});
      this.alertFlag = false;
    }, e => {
      this.alertFlag = true;
      this.alertMsg = "An error occurred while trying to add the challenge"
      }
      
    )}
  }
  

  deleteChallenge(challenge) {
    this.challengeService.deleteChallenge(challenge).subscribe(res => {
      this.challenges = this.challenges.filter((value) => value.name != challenge);
      this.alertFlag = false;
    }, e => {
      this.alertFlag = true;
      this.alertMsg = "An error occured while trying to delete the challenge";
    })
  }
  updateChallenge(newChallenge) {
    let requiredChallenge;
    this.challenges.map(value => {
      if (value.edit === true) {
        requiredChallenge = value;
      }
    })
    if(this.challenges.find(chall => chall.name===newChallenge)!=null){
      this.alertFlag = true;
      this.alertMsg = "The challenge you entered already exists";
    }
    else{
    this.challengeService.updateChallenge(requiredChallenge.name, newChallenge).subscribe(res => {
      this.challenges.map(value => {
        if (value.edit === true) {
          value.name = newChallenge;
          value["edit"] = false;
        }
      })
      this.alertFlag = false;
      this.editFlag = false;
    }, e => {
      this.alertFlag = true;
      this.alertMsg = "An error occured while trying to update the challenge";
    })
  }
  }
  
  edit(challenge) {
    this.challenges.map(value => {
      if (value.name === challenge) {
        value["edit"] = true;
      }
    });
    this.editFlag = true;
  }

  cancel(challenge) {
    challenge.edit = false;
    this.editFlag = false;
  }

}
