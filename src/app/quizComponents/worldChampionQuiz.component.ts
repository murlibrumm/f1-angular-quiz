import { QuizComponent } from './quiz.component';
import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { WCQRRoute } from './../../utils/constants';

@Component({
  selector: 'app-world-champion-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class WorldChampionQuizComponent extends QuizComponent {
  constructor(
    @Inject('worldChampionQuizService') quizService,
    @Inject('numberOfQuestions') numberOfQuestions: number,
    router: Router) { super(quizService, numberOfQuestions, router, WCQRRoute); }
}
