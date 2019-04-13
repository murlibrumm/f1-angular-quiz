import {ActivatedRoute, Router} from '@angular/router';
import { Component, Inject } from '@angular/core';
import { QuizResultsComponent } from './quizResults.component';
import { WCQRoute } from './../../utils/constants';

@Component({
  selector: 'app-world-champions-quiz-results',
  templateUrl: 'quizResults.component.html',
  styleUrls: ['./quizResults.component.css']
})

export class WorldChampionQuizResultsComponent extends QuizResultsComponent {
  constructor(
    @Inject('worldChampionQuizService') quizService,
    @Inject('numberOfQuestions') numberOfQuestions: number,
    router: Router,
    activatedRoute: ActivatedRoute) { super(quizService, numberOfQuestions, activatedRoute, router, WCQRoute);
      console.log(quizService.correctAnswerCount);
      console.log(quizService.currentQuestion);
  }
}
