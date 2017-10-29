import { QuizComponent } from './quiz.component';
import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { PPQRRoute } from './../../utils/constants';

@Component({
  selector: 'app-pole-position-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class PolePositionQuizComponent extends QuizComponent {
  constructor(
    @Inject('polePositionQuizService') quizService,
    @Inject('numberOfQuestions') numberOfQuestions: number,
    router: Router) { super(quizService, numberOfQuestions, router, PPQRRoute); }
}
