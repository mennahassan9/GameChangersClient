import { Component, OnInit } from '@angular/core';
import { TeamService} from '../../Services/team.service';
import { Params, ActivatedRoute , Router} from '@angular/router';


@Component({
  selector: 'app-admin-view-user-team',
  templateUrl: './admin-view-user-team.component.html',
  styleUrls: ['./admin-view-user-team.component.css']
})
export class AdminViewUserTeamComponent implements OnInit {
  teamName: string;
  team: any = {};
  errorFlag: boolean;
  errorMsg: string;
  constructor(  
    private route: ActivatedRoute,
    private router: Router,
    private teamService: TeamService
  ) {
   }

  ngOnInit() {
    this.teamName = this.route.snapshot.params['id'];
    this.teamService.getTeam(this.teamName).subscribe((res) => {
      if (res.data.team != null) {
        this.team = res.data.team;
      } 
      else {
        this.errorFlag=true;
        this.errorMsg="Could'nt retrieve team"
      }
    }, (err) => {
      this.errorFlag=true;
      this.errorMsg="Could'nt retrieve team"
    })
  }
}
