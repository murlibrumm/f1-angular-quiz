import {ActivatedRoute, Router} from '@angular/router';
import { Component, Inject } from '@angular/core';
import { QuizResultsComponent } from './quizResults.component';
import { PPQRoute } from './../../utils/constants';

@Component({
  selector: 'app-pole-position-quiz-results',
  templateUrl: 'quizResults.component.html',
  styleUrls: ['./quizResults.component.css']
})

export class PolePositionQuizResultsComponent extends QuizResultsComponent {
  constructor(
    @Inject('polePositionQuizService') quizService,
    @Inject('numberOfQuestions') numberOfQuestions: number,
    router: Router,
    activatedRoute: ActivatedRoute) { super(quizService, numberOfQuestions, activatedRoute, router, PPQRoute);
      console.log(quizService.correctAnswerCount);
      console.log(quizService.currentQuestion);
  }
}
