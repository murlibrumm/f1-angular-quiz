import { QuizComponent } from './quiz.component';
import {ActivatedRoute, Router} from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import {PPQRRoute, WQRRoute} from './../../utils/constants';
import {QuizService} from "../services/quiz.service";

@Component({
  selector: 'app-winner-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class WinnerQuizComponent extends QuizComponent {

  // advantage via @Inject: we do not have to import the class WinnerQuizService here => no Dependency
  public constructor(
    @Inject('winnerQuizService') quizService: QuizService,
    router: Router, activatedRoute: ActivatedRoute) { super(quizService, activatedRoute, router, WQRRoute); }
}
