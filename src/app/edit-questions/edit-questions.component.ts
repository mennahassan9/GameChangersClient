import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Question } from './models/question'
import { AdminService } from '../Services/admin.service';
import { JudgingService } from '../Services/judging.service';

@Component({
  selector: 'app-edit-questions',
  templateUrl: './edit-questions.component.html',
  styleUrls: ['./edit-questions.component.css']
})

export class EditQuestionsComponent implements OnInit {
  numberOfQuestions;
  questions: any;
  question: any;
  alertFlag:boolean
  string;alertMsg

  constructor(private adminService: AdminService,private judgeService :JudgingService) {

    this.numberOfQuestions = 1;
    this.questions = new Array(this.numberOfQuestions)
    this.question =
      this.questions.fill(Object.create(Question));
  }

  ngOnInit() {
   this.getQuestions();
  }
  getQuestions(){
    
    this.judgeService.getQuestions().subscribe(res=>{
  
    this.alertFlag=false;
      
      
      this.questions = JSON.parse(res['_body']).body;
    this.numberOfQuestions = this.questions.length
      
    }, e=>{
      this.alertFlag=true;
      this.alertMsg="An Error occured while retrieving the questions"

    });
    
  }
  addQuestion() {
    //     console.log(this.numberOfQuestions,this.questions.length);
    //  if(this.numberOfQuestions>this.questions.length){
    //    var i = this.questions.length;
    //    for(;i<this.numberOfQuestions;i++)
    this.questions.push(Object.create(Question));
    this.numberOfQuestions++;
    //  } 
  }
  deleteQuestion() {
    //  if(this.numberOfQuestions<this.questions.length){
    this.questions = this.questions.slice(0, this.numberOfQuestions - 1);
    // }
    this.numberOfQuestions--;
   

    // console.log(this.questions.length);
  }
  submit() {
    
    this.adminService.putQuestions(this.questions).subscribe((res) => {
      console.log(this.questions)
     this.alertFlag=false;
    
    }, e=>{
      this.alertFlag=true;
      this.alertMsg="An Error occured while editing the questions"

    });
  }

}
