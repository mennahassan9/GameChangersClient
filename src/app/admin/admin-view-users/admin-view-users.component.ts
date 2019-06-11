import { Component, OnInit } from '@angular/core';
import { AdminService} from '../../Services/admin.service';
import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';
@Component({
  selector: 'app-admin-view-users',
  templateUrl: './admin-view-users.component.html',
  styleUrls: ['./admin-view-users.component.css']
})
export class AdminViewUsersComponent implements OnInit {

  users: any [];
  loading: boolean; 
  alertFlag: boolean;
  alertMsg: string;
  public data:Array<any> = [];
  public columns:Array<any> = [
    {title: 'User name', name: 'name', filtering: {filterString: '', placeholder: 'Filter by user name'}},
    {title: 'email', name: 'email', filtering: {filterString: '', placeholder: 'Filter by email'}},
    {title: 'Region', name: 'region', filtering: {filterString: '', placeholder: 'Filter by region'}},
    //{title: 'Chapter', name: 'chapter', filtering: {filterString: '', placeholder: 'Filter by chapter'}},
    {title: 'Position', name: 'position'}
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
  
  constructor(private adminService: AdminService) { 

  }
  ngOnInit() {
    this.adminService.getUsers().subscribe(res => {
      this.users = res.data;
      this.length = this.users.length;
      this.parseResponse(res.data);
    }, e=>{
      this.alertFlag=true;
      this.alertMsg= "Couldn't connect to server";

    })
  }

  public parseResponse(data){
    let returnedData = [];
    data.forEach(element => {
      let object = {};
      object['name'] = element.name == undefined ? "": element.name;
      object['email'] = `<a href="#/admin/user?user=${element.email}">${element.email}</a>`;
      object['region'] = element.region==undefined ? "" : element.region;
      //object['chaoter'] = element.chapter==undefined ? "" : element.chapter;
      object['position'] = element.position==undefined ? "" : element.position;
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
