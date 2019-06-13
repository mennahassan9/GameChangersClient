import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { TeamService } from '../Services/team.service';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { HeaderButtonsService } from '../Services/headerButtons.service';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-leader-view-teams',
  templateUrl: './leader-view-teams.component.html',
  styleUrls: ['./leader-view-teams.component.css']
})
export class LeaderViewTeamsComponent implements OnInit {
  currentEmails: Array<string> = []
  form: FormGroup;
  submitted: boolean;
  hidden: boolean;
  teams: any [];
  allowOthers: boolean;
  loading: boolean; 
  alertFlag: boolean;
  alertMsg: string;
  public rows:any[] = [];
  public columns:any[] = [
    {title:'Team Name', name:'team name', filtering: {filterString:'', placeholder: 'Filter by team name'}},
    {title:'Members', name:'members'},
    {title:'Creator', name:'creator'},
    {title:'Region', name:'region', filtering: {filterString:'', placeholder: 'Filter by team region'}},
    {title:'Chapter', name:'chapter', filtering: {filterString:'', placeholder: 'Filter by team chapter'}}
    
  ];
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number;
  public length:number = 0;
  public chapter: any;
  public region: any;
  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };
    private data:any[];

  constructor(
    private teamService: TeamService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private loginService: LoginService,
    private headerService: HeaderButtonsService,
    private userService: UserService
    ) { }

  ngOnInit() {
    this.hidden=true
    this.form = new FormGroup({
      subject: new FormControl(''),
      body: new FormControl('')})
      if (this.localStorageService.get("isGLeader")) {
        this.headerService.setIsSignedInGLeader();
        this.teamService.getTeams().subscribe(res => {
          this.allowOthers=true
          this.teams = res.data;
          this.length = this.teams.length;
          this.parseResponse(this.teams);
        }, e=>{
          this.alertFlag=true;
          this.alertMsg= "Couldn't connect to server";
    
        })
      } else{
        this.loginService.getUser().subscribe((res) => {
          this.chapter = JSON.parse(res["_body"]).data.chapter;
          this.region = JSON.parse(res["_body"]).data.region;
        //  this.userCreatorTeam = JSON.parse(res["_body"]).data.creatorOf;
        if(this.localStorageService.get("isCLeader") == true){
          this.headerService.setIsSignedInCLeader();
          this.teamService.getTeamsC(this.chapter).subscribe(res => {
            console.log(res)
            this.allowOthers=true
            this.teams = res.data;
            this.length = this.teams.length;
            this.parseResponse(this.teams);
          }, e=>{
            this.alertFlag=true;
            this.alertMsg= "Couldn't connect to server";
      
          })}
          if(this.localStorageService.get("isRLeader") == true){
            this.headerService.setIsSignedInRLeader();
            this.teamService.getTeamsR(this.region).subscribe(res => {
              console.log(res)
              this.allowOthers=true
              this.teams = res.data;
              this.length = this.teams.length;
              this.parseResponse(this.teams);
            }, e=>{
              this.alertFlag=true;
              this.alertMsg= "Couldn't connect to server";
        
            })}
        });
      }
  }

  public parseResponse(input){    
    let output = [];
    input.forEach(element => {
     
        let object = {};
        object['team name'] = element.name == undefined ? "" : `<a href="#/viewTeam/${element.name}">${element.name}</a>`;
        object['members'] = element.members == undefined ? "" : element.members.map((member) => `<ul>${member.email}</ul>`).join("");
        object['creator'] = element.creator == undefined ? "" : element.creator.email;
        object['region'] = element.region  == undefined ? "" : element.region
        object['chapter'] = element.chapter  == undefined ? "" : element.chapter
        let getallemails = element.members
        getallemails.push(element.creator)
        object['emails'] = getallemails
        output.push(object);
      
    });
    this.rows = output;
    this.data = output;
    this.onChangeTable(this.config, {page: this.page, itemsPerPage: this.itemsPerPage});
  }

  public onChangeTable(config:any, page:any):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }
    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = this.page && config.paging ? this.changePage(page == null? this.page : page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }
    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }
    if (!columnName) {
      return data;
    }
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {
    this.currentEmails = []
    let filteredData:Array<any> = data;
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          return item[column.name].toLowerCase().match(column.filtering.filterString.toLowerCase());
        });
      }
    });
    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].toLowerCase().match(this.config.filtering.filterString.toLowerCase()));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if (item[column.name].toString().toLowerCase().match(this.config.filtering.filterString.toLowerCase())) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
        try{
          item.emails.forEach(element => {
            this.currentEmails.push(element.email)
          });
        } catch (err) {}
      }
    });
    filteredData = tempArray;
    return filteredData;
  }

  public onCellClick(data: any): any {
    return;
  }

  public checkAllowOthers(inp){
    //console.log(this.allowOthers)
    this.parseResponse(this.teams);
  }

  public send(){
    this.userService.sendEmails(this.currentEmails, this.form.value).subscribe(res => {
      this.submitted = true;
      this.hidden = false;
      this.alertMsg = "Emails sent successfully!";
      this.form.reset();
    }, (err) => {
            this.submitted = false;
            this.hidden = false;
            this.alertMsg = "Something went wrong while sending emails";
          })
    
  }
}
