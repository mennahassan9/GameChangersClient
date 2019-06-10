import { Component, OnInit } from '@angular/core';
import { TeamService } from '../Services/team.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-all-teams',
  templateUrl: './view-all-teams.component.html',
  styleUrls: ['./view-all-teams.component.css']
})
export class ViewAllTeamsComponent implements OnInit {

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
    {title:'Chapter', name:'chapter', filtering: {filterString:'', placeholder: 'Filter by team chapter'}},
    {title:'Looking for', name: 'submitJoin'}
  ];
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number;
  public length:number = 0;
  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };
    private data:any[];

  constructor(
    private teamService: TeamService,
    private router: Router
    ) { }

  ngOnInit() {
    this.teamService.getTeams().subscribe(res => {
      console.log(res)
      this.allowOthers=true
      this.teams = res.data;
      this.length = this.teams.length;
      this.parseResponse(this.teams);
    }, e=>{
      this.alertFlag=true;
      this.alertMsg= "Couldn't connect to server";

    })
  }

  public parseResponse(input){    
    let output = [];
    input.forEach(element => {
      if (!(this.allowOthers && !element.allowOthers)){
        let object = {};
     var teamname=encodeURIComponent('#/viewTeam/'+element.name)
     object['team name'] = element.name == undefined ? "" : `<a href='${teamname}'>${element.name}</a>`;   
        object['members'] = element.members == undefined ? "" : element.members.map((member) => `<a href="/#/admin/user?user=${member.email}">${member.email}</a><br>`).join("");
        object['creator'] = element.creator == undefined ? "" : `<a href="/#/admin/user?user=${element.creator.email}">${element.creator.email}</a>`;
        object['region'] = element.region
        object['chapter'] = element.chapter
        if (element.allowOthers == undefined)
        {
          element.allowOthers = false
        }
       object['submitJoin'] = element.allowOthers == false ? "" : `<div class="row">
          <div class="col-sm-9">${element.lookingFor}</div> 
          <div class="col-sm-3" style="padding-left: 0px;"> 
            <a  href="#/teams/join/${element.name}">
              <button class="btn " style="background-color: #007DB8; border-color: #007DB8; color: #ffffff;" >
                Join
              </button>
            </a>
          </div></div></div>`;
        output.push(object);
      }
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
    return;
  }

  public checkAllowOthers(inp){
    //console.log(this.allowOthers)
    this.parseResponse(this.teams);
  }
}
