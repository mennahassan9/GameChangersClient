import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';
@Component({
  selector: 'app-admin-view-ideas',
  templateUrl: './admin-view-ideas.component.html',
  styleUrls: ['./admin-view-ideas.component.css'],
})
export class AdminViewIdeasComponent implements OnInit {
  ideas: any[];
  loading: boolean;
  alertFlag: boolean;
  alertMsg: string;
  challenge: string;
  public data: Array<any> = [
  ];
  public columns: Array<any> = [
    { title: 'Team name', name: 'teamName', filtering: { filterString: '', placeholder: 'Filter by team name' } },
    { title: 'Idea name', name: 'ideaName', sort: false, filtering: { filterString: '', placeholder: 'Filter by idea name' } },
    // {title: 'Region', name: 'region', sort: 'asc',filtering: {filterString: '', placeholder: 'Filter by region'}},    
    { title: 'Category', name: 'challenge', sort: 'asc' },
    { title: 'Judges score.', name: 'judgesScore' },
    { title: 'Overall score', name: 'score' }
  ];
  public config: any = {
    paging: false,
    sorting: { columns: this.columns },
    className: ['table-striped', 'table-bordered']
  };
  public page: number = 1;
  public itemsPerPage: number = 10;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  private rows: Array<any> = [
  ];


  constructor(private adminService: AdminService) { this.length = this.data.length; }

  ngOnInit() {
    this.toggleLoading();
    this.adminService.getIdeas().subscribe(res => {
      this.ideas = res.body;
      this.parseResponse(res.body);
      this.toggleLoading();
    }, e => {
      this.alertFlag = true;
      this.alertMsg = "Couldn't connect to server";
      this.toggleLoading();
    })
    // this.onChangeTable(this.config);
  }
  toggleLoading() {
    this.loading = !this.loading;
  }
  public parseResponse(data) {
    let retuenedData = [];
    data.forEach(element => {
      let object = {};
      object['teamName'] = `<a href="#/team-control?team=${element.teamName}">${element.teamName}</a>`;
      object['ideaName'] = element.title == undefined ? "" : element.title;
      object['challenge'] = element.category;
      // object['region'] = element.region;
      object['score'] = element.score == '-1' ? 'Not judged yet': element.score;
      object['judgesScore'] = element.judgments.length == 0 ? "No judges assigned yet" : "<ul>";
      for (let index = 0; index < element.judgments.length; index++) {
        const judgment = element.judgments[index];
        object['judgesScore'] += judgment.score != "-1" ? '<li>' + judgment.judgeName + " : " + judgment.score + "</li>" : ' <li>' + judgment.judgeName + " : did not judge yet" + "</li>";
      }
      object['judgesScore'] += element.judgments.length == 0 ? "" : "</ul>";
      retuenedData.push(object);
    });

    this.rows = retuenedData;
    this.data = retuenedData;
    this.onChangeTable(this.config);
  }

  public onChangeTable(config: any): any {

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

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

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
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return item[column.name].toLowerCase().match(column.filtering.filterString.toLowerCase());
        });
      }
    });
    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].toLowerCase().match(this.config.filtering.filterString.toLowerCase()));
    }

    let tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
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
    if (data.column === 'addJudgeButton') {
      let teamName = data.row.teamName;

    }
  }

}
