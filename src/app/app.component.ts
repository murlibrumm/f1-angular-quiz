import { WinnerQuizService } from './winner-quiz.service';
import { Question } from '../models/question';
import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/*export class AppComponent {
  title = 'app';
  private apiUrl  = 'https://address-book-demo.herokuapp.com/api/contacts';
  private apiUrl2 = 'https://ergast.com/api/f1/2008/5/results.json'; // todo add parameters to functions!
  data: any = {};

  constructor(private http: Http) {
    console.log('Hello fellow user');
    this.getRaceResults();
    this.getData();
  }

  getData() {
    return this.http.get(this.apiUrl2)
      .map((res) => res.json());
  }

  getRaceResults() {
    this.getData().subscribe(data => {
      console.log(data);
      console.log(data.MRData);
      this.data = data;
    });
  }
}*/

export class AppComponent {
  title = 'Welcome to the F1-Quiz!';
  currentQuestion: Promise<Question>|null = null;

  constructor(private winnerQuizService: WinnerQuizService) {
    this.init();
  }

  async init() {
    this.currentQuestion = await this.winnerQuizService.getNewQuestion();
    //console.log(this.currentQuestion.answers);
  }
}
