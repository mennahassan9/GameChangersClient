import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute , Router} from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { JudgingService } from '../Services/judging.service';
import { IdeaService } from '../Services/idea.service';
import { HeaderButtonsService } from '../Services/headerButtons.service';
@Component({
  selector: 'app-judge-idea',
  templateUrl: './judge-idea.component.html',
  styleUrls: ['./judge-idea.component.css']
})
export class JudgeIdeaComponent implements OnInit {

  teamName : string;
  idea: any = {};
  form: FormGroup;
  formSubmitted: boolean;
  loading: boolean; 

  innovationScoreValid: boolean = true;;
  problemSolvingScoreValid: boolean = true;
  financialImpactScoreValid: boolean = true;
  feasibilityScoreValid: boolean = true;
  qualityOfPresentationScoreValid: boolean = true;
  ideaId: string = "";

  totalScore: number = 0;
  totalScoreValid: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private judgingService: JudgingService,
    private ideaService: IdeaService,
    private headerButtonsService: HeaderButtonsService
  ) { }
  
  submit() {
    console.log(this.form.value);
    if(this.form.valid && this.feasibilityScoreValid && this.financialImpactScoreValid && this.innovationScoreValid
    && this.qualityOfPresentationScoreValid && this.problemSolvingScoreValid){
      this.formSubmitted = true;

      this.judgingService.judge(this.form.value, this.ideaId, this.totalScore).then((success)=> {
        this.router.navigate(['/judge']);
      })
      .catch((err)=> {
        console.log(err);
      });
    }
    else{

    }
    
  }
  ngOnInit() {
    this.teamName = this.route.snapshot.queryParams['team'];
    this.idea = {
      name: "",
      filename: this.teamName
    };
    this.form = new FormGroup({
      innovationScore: new FormControl('' , [Validators.required]),
      innovationComments: new FormControl('', []),
      problmeSolvingScore: new FormControl('' , [Validators.required]),
      problmeSolvingComments: new FormControl('', []),
      financialImpactScore: new FormControl('',[Validators.required]),
      financialImpactComments: new FormControl('', []),
      feasibilityScore: new FormControl('', [Validators.required]),
      feasibilityComments: new FormControl('', []),
      qualityOfPresentationScore: new FormControl('', [Validators.required]),
      qualityOfPresentationComments: new FormControl('',[])
    });
    this.judgingService.getIdea(this.teamName)
    .then(response=>{

      this.idea.name = response['title'];
      this.idea.filename = response['filename'];
      this.ideaId = response['ideaId'];
      this.totalScore = Math.max(response['score'],0);
      console.log('total score ', this.totalScore);
      console.log(response);
      this.form = new FormGroup({
        innovationScore: new FormControl(response['innovationScore'] == -1? '':response['innovationScore'] , [Validators.required]),
        innovationComments: new FormControl(response['innovationComment'], []),
        problmeSolvingScore: new FormControl(response['problemSolvingScore'] == -1? '':response['problemSolvingScore'] , [Validators.required]),
        problmeSolvingComments: new FormControl(response['problemSolvingComment'], []),
        financialImpactScore: new FormControl(response['financialImpactScore'] == -1? '':response['financialImpactScore'],[Validators.required]),
        financialImpactComments: new FormControl(response['financialImpactComment'], []),
        feasibilityScore: new FormControl(response['feasibilityScore'] == -1? '':response['feasibilityScore'], [Validators.required]),
        feasibilityComments: new FormControl(response['feasibilityComment'], []),
        qualityOfPresentationScore: new FormControl(response['qualityScore'] == -1? '':response['qualityScore'], [Validators.required]),
        qualityOfPresentationComments: new FormControl(response['qualityComment'],[])
      });
      this.startCalculateScore();
    })
    .catch(err =>{
      console.log(err);
      this.startCalculateScore();
    })

    // this.headerButtonsService.signOut();
  }
  onDownload() {
    this.toggleLoading()
    console.log("DOWN", this.idea.filename);
    this.ideaService.downloadIdea(this.idea.filename).subscribe(
      (res) => {
          var fileURL = URL.createObjectURL(res);
          var win = window.open(fileURL);
          this.toggleLoading();
      } , (err) => {
          alert("Download Failed! Try again later.");
          this.toggleLoading();
      }
    );
  }
  checkBtn() {
    if(this.form.valid && this.feasibilityScoreValid && this.financialImpactScoreValid && this.innovationScoreValid
      && this.qualityOfPresentationScoreValid && this.problemSolvingScoreValid) {
          (<HTMLInputElement> document.getElementById("submit_btn")).disabled = false;
      }else {
        (<HTMLInputElement> document.getElementById("submit_btn")).disabled = true;
      }

  }
  startCalculateScore(){

    this.form.get('innovationScore').valueChanges.subscribe(() => {
      let innovationScore = isNaN(parseInt(this.form.get('innovationScore').value)) ? 0 : parseInt(this.form.get('innovationScore').value)
      let problmeSolvingScore = isNaN(parseInt(this.form.get('problmeSolvingScore').value)) ? 0 : parseInt(this.form.get('problmeSolvingScore').value)
      let financialImpactScore = isNaN(parseInt(this.form.get('financialImpactScore').value)) ? 0 : parseInt(this.form.get('financialImpactScore').value)
      let feasibilityScore = isNaN(parseInt(this.form.get('feasibilityScore').value)) ? 0 : parseInt(this.form.get('feasibilityScore').value)     
      let qualityOfPresentationScore = isNaN(parseInt(this.form.get('qualityOfPresentationScore').value)) ? 0 : parseInt(this.form.get('qualityOfPresentationScore').value)     
      
      if(innovationScore > 20) {
        this.innovationScoreValid = false;
      }else{
        this.innovationScoreValid = true;
        this.totalScore = innovationScore + problmeSolvingScore + financialImpactScore + feasibilityScore + qualityOfPresentationScore;
      }
      this.checkBtn();
    });
    this.form.get('problmeSolvingScore').valueChanges.subscribe(() => {
        let innovationScore = isNaN(parseInt(this.form.get('innovationScore').value)) ? 0 : parseInt(this.form.get('innovationScore').value)
        let problmeSolvingScore = isNaN(parseInt(this.form.get('problmeSolvingScore').value)) ? 0 : parseInt(this.form.get('problmeSolvingScore').value)     
        let financialImpactScore = isNaN(parseInt(this.form.get('financialImpactScore').value)) ? 0 : parseInt(this.form.get('financialImpactScore').value)
        let feasibilityScore = isNaN(parseInt(this.form.get('feasibilityScore').value)) ? 0 : parseInt(this.form.get('feasibilityScore').value)     
        let qualityOfPresentationScore = isNaN(parseInt(this.form.get('qualityOfPresentationScore').value)) ? 0 : parseInt(this.form.get('qualityOfPresentationScore').value)     
        
        if(problmeSolvingScore > 20) {
          this.problemSolvingScoreValid = false;
        }else{
          this.problemSolvingScoreValid = true;
          this.totalScore = innovationScore + problmeSolvingScore + financialImpactScore + feasibilityScore + qualityOfPresentationScore;
        }
        this.checkBtn();
    });
    this.form.get('financialImpactScore').valueChanges.subscribe(() => {
      let innovationScore = isNaN(parseInt(this.form.get('innovationScore').value)) ? 0 : parseInt(this.form.get('innovationScore').value)
      let financialImpactScore = isNaN(parseInt(this.form.get('financialImpactScore').value)) ? 0 : parseInt(this.form.get('financialImpactScore').value)
      let problmeSolvingScore = isNaN(parseInt(this.form.get('problmeSolvingScore').value)) ? 0 : parseInt(this.form.get('problmeSolvingScore').value)     
      let feasibilityScore = isNaN(parseInt(this.form.get('feasibilityScore').value)) ? 0 : parseInt(this.form.get('feasibilityScore').value)     
      let qualityOfPresentationScore = isNaN(parseInt(this.form.get('qualityOfPresentationScore').value)) ? 0 : parseInt(this.form.get('qualityOfPresentationScore').value)     
      
      if(financialImpactScore > 30) {
        this.financialImpactScoreValid = false;
      }else{
        this.financialImpactScoreValid = true;
        this.totalScore = innovationScore + problmeSolvingScore + financialImpactScore + feasibilityScore + qualityOfPresentationScore;
      }
      this.checkBtn();
    });
      this.form.get('feasibilityScore').valueChanges.subscribe(() => {
        let innovationScore = isNaN(parseInt(this.form.get('innovationScore').value)) ? 0 : parseInt(this.form.get('innovationScore').value)
        let financialImpactScore = isNaN(parseInt(this.form.get('financialImpactScore').value)) ? 0 : parseInt(this.form.get('financialImpactScore').value)
        let problmeSolvingScore = isNaN(parseInt(this.form.get('problmeSolvingScore').value)) ? 0 : parseInt(this.form.get('problmeSolvingScore').value)     
        let feasibilityScore = isNaN(parseInt(this.form.get('feasibilityScore').value)) ? 0 : parseInt(this.form.get('feasibilityScore').value)     
        let qualityOfPresentationScore = isNaN(parseInt(this.form.get('qualityOfPresentationScore').value)) ? 0 : parseInt(this.form.get('qualityOfPresentationScore').value)     
        
        if(feasibilityScore > 20) {
          this.feasibilityScoreValid = false;
        }else{
          this.feasibilityScoreValid = true;
          this.totalScore = innovationScore + problmeSolvingScore + financialImpactScore + feasibilityScore + qualityOfPresentationScore;
        }
        this.checkBtn();
      });
      this.form.get('qualityOfPresentationScore').valueChanges.subscribe(() => {
        let innovationScore = isNaN(parseInt(this.form.get('innovationScore').value)) ? 0 : parseInt(this.form.get('innovationScore').value)
        let financialImpactScore = isNaN(parseInt(this.form.get('financialImpactScore').value)) ? 0 : parseInt(this.form.get('financialImpactScore').value)
        let problmeSolvingScore = isNaN(parseInt(this.form.get('problmeSolvingScore').value)) ? 0 : parseInt(this.form.get('problmeSolvingScore').value)     
        let feasibilityScore = isNaN(parseInt(this.form.get('feasibilityScore').value)) ? 0 : parseInt(this.form.get('feasibilityScore').value)     
        let qualityOfPresentationScore = isNaN(parseInt(this.form.get('qualityOfPresentationScore').value)) ? 0 : parseInt(this.form.get('qualityOfPresentationScore').value)     
        
        if(qualityOfPresentationScore > 10) {
          this.qualityOfPresentationScoreValid = false;
        }else{
          this.qualityOfPresentationScoreValid = true;
          this.totalScore = innovationScore + problmeSolvingScore + financialImpactScore + feasibilityScore + qualityOfPresentationScore;
        }
        this.checkBtn();
      });
  }
  toggleLoading() {
    this.loading = !this.loading;
    if(this.loading)
      this.form.disable()
    else
       this.form.enable()
  }

}
