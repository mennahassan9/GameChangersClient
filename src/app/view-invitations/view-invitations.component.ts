import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { TeamService } from './../Services/team.service';
import { environment } from '../../environments/environment';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view-invitations',
  templateUrl: './view-invitations.component.html',
  styleUrls: ['./view-invitations.component.css']
})
export class ViewInvitationsComponent implements OnInit {
  teams: any = {};
  modalRef: ModalDirective;

  constructor(private teamService: TeamService,
    private router: Router,
    private http: Http,) { }

    openEditModal(modal: ModalDirective, question: any) {
      this.modalRef = modal;
      this.modalRef.show();
    }

  ngOnInit() {
    this.teamService.Invitations().subscribe((res) => {
      this.teams = (res["teams"]);
    });
  }

}
