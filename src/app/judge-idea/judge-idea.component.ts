import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute , Router} from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';

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
  totalScore: number = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }
  
  submit() {
    this.formSubmitted = true;
    // If success 
    this.router.navigate(['/judge']);
  }
  ngOnInit() {
    this.teamName = this.route.snapshot.queryParams['team'];
    this.idea = {
      name: "Awesome Idea",
      filename: this.teamName
    };
    this.form = new FormGroup({
      innovationScore: new FormControl('', [Validators.required]),
      innovationComments: new FormControl('', []),
      problmeSolvingScore: new FormControl('', [Validators.required]),
      problmeSolvingComments: new FormControl('', [])
    });
    this.form.get('innovationScore').valueChanges.subscribe(() => {
      let innovationScore = isNaN(parseInt(this.form.get('innovationScore').value)) ? 0 : parseInt(this.form.get('innovationScore').value)
      let problmeSolvingScore = isNaN(parseInt(this.form.get('problmeSolvingScore').value)) ? 0 : parseInt(this.form.get('problmeSolvingScore').value)
      this.totalScore = innovationScore + problmeSolvingScore;
      });
    this.form.get('problmeSolvingScore').valueChanges.subscribe(() => {
        let innovationScore = isNaN(parseInt(this.form.get('innovationScore').value)) ? 0 : parseInt(this.form.get('innovationScore').value)
        let problmeSolvingScore = isNaN(parseInt(this.form.get('problmeSolvingScore').value)) ? 0 : parseInt(this.form.get('problmeSolvingScore').value)
        this.totalScore = innovationScore + problmeSolvingScore;
    });
  }

}
