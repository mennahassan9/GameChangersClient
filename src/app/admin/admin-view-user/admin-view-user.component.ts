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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService
  ) { }
  

  redirectToIdea() {
    this.router.navigate(['/admin/viewIdea',this.user]);
  }

  redirectToTeam() {
    this.router.navigate(['/admin/viewTeam',this.user]);
}

  ngOnInit() {
   this.user = this.route.snapshot.queryParams['user'];
   this.adminService.getUser(this.user).subscribe(res => {
   this.currentUser = res.body;
  })
}

}
