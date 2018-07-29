import { Component, OnInit } from '@angular/core';
import { AdminService} from '../../Services/admin.service';

@Component({
  selector: 'app-admin-top-ideas',
  templateUrl: './admin-top-ideas.component.html',
  styleUrls: ['./admin-top-ideas.component.css']
})
export class AdminTopIdeasComponent implements OnInit {


  
  topIdeas: any [];
  loading: boolean; 
  newData: any[]=[];
  public length:number = 0;
  public columns:Array<any> = [
    {title: 'idea Title', name: 'title'},
    {title: 'Score', name: 'score'},
    {title: 'Team', name: 'teamName'},
  
  ];
  constructor(private adminService: AdminService) { }
 
  ngOnInit() {

    this.toggleLoading();
    this.adminService.getTopIdea().subscribe(res => {
      this.topIdeas = res.body;
      this.parseResponse(res.body);
      this.toggleLoading();
    })
  }

  toggleLoading() {
    this.loading = !this.loading;
  }
  public parseResponse(data){
    let returnedData = [];
    

    for (let key in data) {
      this.newData.push(data[key]);
      }  
     
     

    }
    
  }


 


