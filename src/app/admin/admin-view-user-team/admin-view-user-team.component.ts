import { Component, OnInit } from '@angular/core';
import { AdminService} from '../../Services/admin.service';
import { Params, ActivatedRoute , Router} from '@angular/router';


@Component({
  selector: 'app-admin-view-user-team',
  templateUrl: './admin-view-user-team.component.html',
  styleUrls: ['./admin-view-user-team.component.css']
})
export class AdminViewUserTeamComponent implements OnInit {
  user: string;
  team: any = {};
  constructor(  
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService
  ) {
   }

  ngOnInit() {
    this.user = this.route.snapshot.params['id'];
    console.log(this.user+"team name");
    this.adminService.getTeamAsMember(this.user).subscribe((res) => {
      if (JSON.parse(res["_body"])["team"] != null) {
        this.team = JSON.parse(res["_body"]);
      } 
      else {
        console.log("NULL TEAM");
      }
    }, (err) => {
      console.log("ERR", err);
    })
    console.log(this.team);
  }

}
