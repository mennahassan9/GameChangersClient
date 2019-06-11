import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { LoginService } from '../Services/login.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { HeaderButtonsService } from '../Services/headerButtons.service';

@Component({
  selector: 'app-leader-view-users',
  templateUrl: './leader-view-users.component.html',
  styleUrls: ['./leader-view-users.component.css']
})
export class LeaderViewUsersComponent implements OnInit {

  users: any [];
  loading: boolean; 
  alertFlag: boolean;
  alertMsg: string;
  chapter: any;
  region: any;

  public data:Array<any> = [];
  public columns:Array<any> = [
    {title: 'User name', name: 'name', filtering: {filterString: '', placeholder: 'Filter by user name'}},
    {title: 'Email', name: 'email', filtering: {filterString: '', placeholder: 'Filter by Email'}},
    {title: 'Team', name: 'team', filtering: {filterString: '', placeholder: 'Filter by Team'}}
  ];
  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    className: ['table-striped', 'table-bordered']
  };
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number;
  public length:number = 0;
  private rows:Array<any> = [];
  
  constructor(private adminService: UserService,
  private loginService: LoginService,
private localStorageService: LocalStorageService,
private headerService: HeaderButtonsService) { 

  }
  ngOnInit() {

   
    this.loginService.getUser().subscribe((res) => {
      this.chapter = JSON.parse(res["_body"]).data.chapter;
      this.region = JSON.parse(res["_body"]).data.region; 

      if(this.localStorageService.get("isCLeader") == true){
        this.headerService.setIsSignedInCLeader();
        this.adminService.getUsersC(this.chapter).subscribe(res => {
          this.users = res.data;
          console.log(res.data, "USERS")
          this.length = this.users.length;
          this.parseResponse(res.data);
        }, e=>{
          this.alertFlag=true;
          this.alertMsg= "Couldn't connect to server";
    
        })}
        if(this.localStorageService.get("isRLeader") == true){
          this.headerService.setIsSignedInRLeader();
          this.adminService.getUsersR(this.region).subscribe(res => {
            this.users = res.data;
            this.length = this.users.length;
            this.parseResponse(res.data);
          }, e=>{
            this.alertFlag=true;
            this.alertMsg= "Couldn't connect to server";
      
          })}
    })
    //  this.userCreatorTeam = JSON.parse(res["_body"]).data.creatorOf;
   
  }

  public parseResponse(data){
    let returnedData = [];
    data.forEach(element => {
      let object = {};
      object['name'] = element.name == undefined ? "": element.name;
      object['email'] = `<a href="#/admin/user?user=${element.email}">${element.email}</a>`;
      object['team'] = element.teamMember=="-1" ? "No Team Yet" : element.teamMember;
   
      returnedData.push(object);
    });
    this.rows = returnedData;
    this.data = returnedData;
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
      }
    });
    filteredData = tempArray;
    return filteredData;
  }

  public onCellClick(data: any): any {
    if (data.column === 'addJudgeButton'){
        let teamName = data.row.teamName;
    }
  }
}
