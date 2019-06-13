import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';
import "rxjs";

import { environment } from '../../environments/environment';

@Injectable()
export class JudgingService {
  constructor(
    private http: Http,
    private localStorageService: LocalStorageService) {
  }

  getIdeas(): Observable<any> {

    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);

    return this.http.get("/judge/ideas", { headers: reqHeaders });
  }
  getTeamIdea(teamName) {
    return new Promise((resolve, reject) => {
      const reqHeaders: Headers = new Headers();
      reqHeaders.append('Content-Type', 'application/json');
      const currentToken = this.localStorageService.get('token');
      reqHeaders.append('Authorization', 'Bearer ' + currentToken);
      this.http.get("/judge/getTeamIdea/" + teamName, { headers: reqHeaders })
        .map(res => res.json()).subscribe(response => {;
          resolve(response)
        },
          err => {
            reject(err);
          });
    });
  }
  getTeamIdea(teamName) {
    return new Promise((resolve, reject) => {
      const reqHeaders: Headers = new Headers();
      reqHeaders.append('Content-Type', 'application/json');
      const currentToken = this.localStorageService.get('token');
      reqHeaders.append('Authorization', 'Bearer ' + currentToken);
      this.http.get( "/judge/getTeamIdea/" + teamName, { headers: reqHeaders })
        .map(res => res.json()).subscribe(response => {;
          resolve(response)
        },
          err => {
            reject(err);
          });
    });
  }
  getIdea(teamName) {
    return new Promise((resolve, reject) => {
      const reqHeaders: Headers = new Headers();
      reqHeaders.append('Content-Type', 'application/json');
      const currentToken = this.localStorageService.get('token');
      reqHeaders.append('Authorization', 'Bearer ' + currentToken);
      this.http.get("/judge/ideas/" + teamName, { headers: reqHeaders })
        .map(res => res.json()).subscribe(response => {;
          resolve(response)
        },
          err => {
            reject(err);
          });
    });
  }

  judge(questions, ideaId, teamName) {
    return new Promise((resolve, reject) => {
      const reqHeaders: Headers = new Headers();
      reqHeaders.append('Content-Type', 'application/json');
      const currentToken = this.localStorageService.get('token');
      reqHeaders.append('Authorization', 'Bearer ' + currentToken);
      this.http.post("/judge/submit/", { ideaId, questions, teamName }, { headers: reqHeaders })
        .map(res => res.json()).subscribe(response => {
          resolve(response)
        },
          err => {
            reject(err);
          });
    });
  }

  parseJudgingData(data, ideaId, judgeId, score) {
    return {
      innovationComment: data.innovationComments,
      problemSolvingComment: data.problmeSolvingComments,
      financialImpactComment: data.financialImpactComments,
      feasibilityComment: data.feasibilityComments,
      qualityComment: data.qualityOfPresentationComments,
      ideaId,
      judgeId,
      score,
      innovationScore: data.innovationScore,
      problemSolvingScore: data.problmeSolvingScore,
      financialImpactScore: data.financialImpactScore,
      feasibilityScore: data.feasibilityScore,
      qualityScore: data.qualityOfPresentationScore
    }
  }
  getQuestions(): Observable<any> {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get("/judge/get-questions", { headers: reqHeaders });
  }
}