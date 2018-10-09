import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  @ViewChild('ideasChart') public ideasChart: BaseChartDirective
  @ViewChild('teamsChart') public teamsChart: BaseChartDirective

  alertFlag: boolean;
  alertMsg: string;

  public users: string = "";
  public teams: number = 0;
  public judges: string = "";

  public ideasChartLabels: string[] = ['Judged Ideas', 'Unjudged Ideas'];
  public ideasChartData: number[] = [0, 0];
  public ideasChartType: string = 'pie';
  public ideasChartColors: any[] = [
    {
      backgroundColor: ['#42AEAF', '#C1D82F'],
    }];

  public teamsChartLabels: string[] = ['Sumbitted Ideas', ' No Ideas'];
  public teamsChartData: number[] = [0, 0];
  public teamsChartType: string = 'doughnut';
  public teamsChartColors: any[] = [
    {
      backgroundColor: ['#42AEAF', '#C1D82F'],
    }];

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit() {

    this.adminService.getStatistics().subscribe(res=>{
      this.alertFlag=false;
      this.users = res.data.numberOfUsers;
      this.teams = parseInt(res.data.numberofTeamsThatDidntSubmittedIdeas) + parseInt(res.data.numberofTeamsThatSubmittedIdeas);
      this.judges = res.data.numberOfJudges;

      this.ideasChartData[0] = (res.data.numberOfJudgedIdeas);
      this.ideasChartData[1] = (res.data.numberOfUnjudgedIdeas);

      this.teamsChartData[0] = (res.data.numberofTeamsThatSubmittedIdeas);
      this.teamsChartData[1] = (res.data.numberofTeamsThatDidntSubmittedIdeas);
      this.ideasChart.chart.update();
      this.teamsChart.chart.update();
    }, e => {
      this.alertFlag = true;
      this.alertMsg = "An error occured while trying to retrieve users and teams data";

    })
  }

}
