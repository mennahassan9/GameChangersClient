import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute , Router} from '@angular/router';
import { AdminService} from '../../Services/admin.service';


@Component({
  selector: 'app-admin-view-user',
  templateUrl: './admin-view-user.component.html',
  styleUrls: ['./admin-view-user.component.css']
})
export class AdminViewUserComponent implements OnInit {
  user: string;
  currentUser: any = {};
  alertFlag: boolean
  alertMsg: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService
  ) { }
  

  redirectToIdea() {
    this.router.navigate(['/admin/viewIdea',this.user]);
  }

  redirectToTeam() {
    this.router.navigate(['/viewTeam',this.currentUser.teamMember]);
  } 

  ngOnInit() {
   this.user = this.route.snapshot.queryParams['user'];
   this.adminService.getUser(this.user).subscribe(res => {
     this.alertFlag=false;
   this.currentUser = res.data;
  }, e=>{ 
    this.alertFlag=true;
    this.alertMsg="Something went wrong, couldn't retrieve user's information"

  })
}

}
