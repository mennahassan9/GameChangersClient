import { Component, OnInit } from '@angular/core';

import { AdminService} from '../../Services/admin.service';
import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';
@Component({
  selector: 'app-admin-view-users',
  templateUrl: './admin-view-users.component.html',
  styleUrls: ['./admin-view-users.component.css']
})
export class AdminViewUsersComponent implements OnInit {

  ideas: any [];
  loading: boolean; 
  public data:Array<any> = [
    ];
  public columns:Array<any> = [
    {title: 'User name', name: 'name', filtering: {filterString: '', placeholder: 'Filter by user name'}},
    {title: 'email', name: 'email', filtering: {filterString: '', placeholder: 'Filter by email'}},
    {title: 'Location', name: 'location', filtering: {filterString: '', placeholder: 'Filter by Location'}},
    {title: 'Position', name: 'position'}
  
  ];
  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    className: ['table-striped', 'table-bordered']
  };
  public page:number = 2;
  public itemsPerPage:number = 2;
  public maxSize:number = 5;
  public numPages:number = 5;
  public length:number = 6;
  private rows:Array<any> = [
    ];
  

  constructor(private adminService: AdminService) { this.length = this.data.length;
  }
  ngOnInit() {
    
    this.adminService.getUsers().subscribe(res => {
      console.log(res);
      this.ideas = res.body;
      this.parseResponse(res.body);

    })
    // this.onChangeTable(this.config);
  }
  public parseResponse(data){
    let retuenedData = [];
    data.forEach(element => {
      let object = {};
      object['name'] = element.name == undefined ? "": element.name;
      object['email'] = `<a href="#/admin/user?user=${element.email}">${element.email}</a>`;
      object['location'] = element.location==undefined ? "" : element.location;
      object['region'] = element.region==undefined ? "" : element.region;
      object['position'] = element.position==undefined ? "" : element.position;
      retuenedData.push(object);
    });
    this.rows = retuenedData;
    this.data = retuenedData;
    this.onChangeTable(this.config);
  }
  public onChangeTable(config:any):any {
    console.log(config)
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.length = sortedData.length;
    this.rows = sortedData;
    

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

    // simple sorting
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
    console.log(name);
    }
  }
}
