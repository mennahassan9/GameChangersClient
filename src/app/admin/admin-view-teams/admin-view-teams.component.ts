import { Component, OnInit } from '@angular/core';
import { AdminService} from '../../Services/admin.service';
import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-view-teams',
  templateUrl: './admin-view-teams.component.html',
  styleUrls: ['./admin-view-teams.component.css']
})
export class AdminViewTeamsComponent implements OnInit {

  form: FormGroup;
  submitted: boolean;
  hidden: boolean;
  teams: any [];
  loading: boolean; 
  alertFlag: boolean;
  alertMsg: string;
  currentEmails: string[];
  public rows:any[] = [];
  public columns:any[] = [
    {title:'Team Name', name:'team name', filtering: {filterString:'', placeholder: 'Filter by team name'}},
    {title:'Members', name:'members'},
    {title:'Creator', name:'creator'},
    {title:'Region', name:'region', filtering: {filterString: '', placeholder: 'Filter by Region'}},
    {title:'Chapter', name:'chapter', filtering: {filterString: '', placeholder: 'Filter by Chapter'}},
    {title:'Idea', name:'idea', filtering: {filterString: '', placeholder: 'Filter by Idea name'}}
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

  constructor(private adminService: AdminService) {

   }

  ngOnInit() {
    this.form = new FormGroup({
      subject: new FormControl(''),
      body: new FormControl('')})
    this.adminService.getTeams().subscribe(res => {
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
      let object = {};
      var teamname=encodeURIComponent(element.name)
      object['team name'] = element.name == undefined ? "" : `<a href='/#/viewTeam/${teamname}'>${element.name}</a>`;
      object['members'] = element.members == undefined ? "" : element.members.map((member) => `<a href="/#/admin/user?user=${member.email}">${member.email}</a><br>`).join("");
      object['creator'] = element.creator == undefined ? "" : `<a href="/#/admin/user?user=${element.creator.email}">${element.creator.name}</a>`;
      object['region'] = element.region==undefined ? "" : element.region;
      object['chapter'] = element.chapter == undefined ? "" : element.chapter;
      object['idea'] = element.idea == undefined ? "No idea submitted" : element.team
      let allEmails = element.members;
      allEmails.push(element.creator)
      object['emails'] = allEmails;
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

    let tempEmails = [];
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
        let temp = item.emails;
        try{
          temp.forEach((member:any) => {
              tempEmails.push(member.email)
          });
        } catch(err){
          console.log(temp, err)
        }
      }
    });
    console.log(tempEmails)
    this.currentEmails = tempEmails;
    filteredData = tempArray;
    this.hidden = true;
    return filteredData;
  }

  public onCellClick(data: any): any {
    return;
  }
  public send(){
    this.adminService.sendEmails(this.currentEmails, this.form.value).subscribe(res => {
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
