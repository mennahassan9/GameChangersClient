import { Component, OnInit } from '@angular/core';
import { AdminService} from '../../Services/admin.service';
import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';
@Component({
  selector: 'app-admin-view-ideas',
  templateUrl: './admin-view-ideas.component.html',
  styleUrls: ['./admin-view-ideas.component.css'],
})
export class AdminViewIdeasComponent implements OnInit {
  ideas: any [];

  public data:Array<any> = [
    {
    teamName: "Test1",
    ideaName: "Awesome idea",
    challenge: "Blockchain",
    judgesScore: "30"
  },
  {
    teamName: "EMEA Test1",
    ideaName: "some idea",
    challenge: "IOT",
    judgesScore: "30"
  }];
  public columns:Array<any> = [
    {title: 'Team name', name: 'teamName', filtering: {filterString: '', placeholder: 'Filter by team name'}},
    {title: 'Idea name',name: 'ideaName',sort: false,filtering: {filterString: '', placeholder: 'Filter by idea name'}},
    {title: 'Location', name: 'location', sort: 'asc',filtering: {filterString: '', placeholder: 'Filter by location'}},    
    {title: 'Challenge name', name: 'challenge', sort: 'asc'},
    {title: 'Judges score.', name: 'judgesScore'}
  ];
  public config:any = {
    paging: false,
    sorting: {columns: this.columns},
    className: ['table-striped', 'table-bordered']
  };
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  private rows:Array<any> = [
    {
    teamName: "Test1",
    ideaName: "Awesome idea",
    challenge: "Blockchain",
    judgesScore: "30"
  },
  {
    teamName: "EMEA Test1",
    ideaName: "some idea",
    challenge: "IOT",
    judgesScore: "30"
  }];
  

  constructor(private adminService: AdminService) { this.length = this.data.length; }

  ngOnInit() {
    
    this.adminService.getIdeas().subscribe(res => {
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
      object['teamName'] = element.teamName;
      object['ideaName'] = element.title;
      object['challenge'] = element.challenge;
      object['location'] = element.location;
      object['judgesScore'] = element.judgments.length == 0 ? "No judges assigned yet" : "";
      for (let index = 0; index < element.judgments.length; index++) {
        const judgment = element.judgments[index];
        object['judgesScore'] += judgment.judgeName + " : " + judgment.score + "\n";
      }
      retuenedData.push(object);
    });
    console.log(retuenedData)
    this.rows = retuenedData;
    this.data = retuenedData;
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
    console.log(data);
  }

}
