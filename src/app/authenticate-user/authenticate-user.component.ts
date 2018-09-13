import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { UserService } from '../Services/user.service';
@Component({
  selector: 'app-authenticate-user',
  templateUrl: './authenticate-user.component.html',
  styleUrls: ['./authenticate-user.component.css']
})
export class AuthenticateUserComponent implements OnInit {
  private userId :string;
  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params) => {
      this.userId = params['id'];
      this.userService.authenticate(this.userId).then((success) => {
        
      })
    })
  }

}
