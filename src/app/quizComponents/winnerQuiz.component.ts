import { QuizComponent } from './quiz.component';
import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { WQRRoute } from './../../utils/constants';

@Component({
  selector: 'app-winner-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class WinnerQuizComponent extends QuizComponent {

  // advantage via @Inject: we do not have to import the class WinnerQuizService here => no Dependency
  constructor(
    @Inject('winnerQuizService') quizService,
    @Inject('numberOfQuestions') numberOfQuestions: number,
    router: Router) { super(quizService, numberOfQuestions, router, WQRRoute); }
}
