import { Component, OnInit } from '@angular/core';
import { EmailDomain } from './Models/domainModel';
import { DomainService } from '../../Services/domain.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-email-domain',
  templateUrl: './admin-email-domain.component.html',
  styleUrls: ['./admin-email-domain.component.css'],
})
export class AdminEmailDomainComponent implements OnInit {

  domains: EmailDomain[];
  alertFlag: boolean;
  alertMsg: string;
  editFlag:boolean;

  constructor(
    // private router: Router,
    private domainService: DomainService

  ) { }

  ngOnInit() {
    this.domainService.getDomains().subscribe(res=>{
      this.domains = JSON.parse(res._body)["body"];
      }, e => {
        this.domains = [];
    })
  }

  addDomain(domain) {
    this.domainService.addDomain(domain).subscribe(res => {
      this.domains.push({ name: domain, edit:false});
      this.alertFlag = false;
    }, e => {
      this.alertFlag = true;
      if(domain) {
        this.alertMsg = "The domain you entered already exists";
      }
      else {
        this.alertMsg = "Please enter a valid domain";
      }
      
    })
  }

  deleteDomain(domain) {
    this.domainService.deleteDomain(domain).subscribe(res => {
      this.domains = this.domains.filter((value) => value.name != domain);
      this.alertFlag = false;
    }, e => {
      this.alertFlag = true;
      this.alertMsg = "An error occured while trying to delete the domain";
    })
  }
  updateDomain(newDomain) {
    let requiredDomain;
    this.domains.map(value => {
      if (value.edit === true) {
        requiredDomain = value;
      }
    })
    this.domainService.updateDomain(requiredDomain.name, newDomain).subscribe(res => {
      this.domains.map(value => {
        if (value.edit === true) {
          value.name = newDomain;
          value["edit"] = false;
        }
      })
      this.alertFlag = false;
      this.editFlag = false;
    }, e => {
      this.alertFlag = true;
      this.alertMsg = "An error occured while trying to update the domain";
    })
  }
  
  edit(domain) {
    this.domains.map(value => {
      if (value.name === domain) {
        value["edit"] = true;
      }
    });
    this.editFlag = true;
  }

  cancel(domain) {
    domain.edit = false;
    this.editFlag = false;
  }

}
