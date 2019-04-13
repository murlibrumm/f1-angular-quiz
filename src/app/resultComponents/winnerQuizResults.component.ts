import {ActivatedRoute, Router} from '@angular/router';
import { Component, Inject } from '@angular/core';
import { QuizResultsComponent } from './quizResults.component';
import { WQRoute } from './../../utils/constants';

@Component({
  selector: 'app-winner-quiz-results',
  templateUrl: 'quizResults.component.html',
  styleUrls: ['./quizResults.component.css']
})

export class WinnerQuizResultsComponent extends QuizResultsComponent {
  constructor(
    @Inject('winnerQuizService') quizService,
    @Inject('numberOfQuestions') numberOfQuestions: number,
    router: Router,
    activatedRoute: ActivatedRoute) { super(quizService, numberOfQuestions, activatedRoute, router, WQRoute);
      console.log(quizService.correctAnswerCount);
      console.log(quizService.currentQuestion);
  }
}
