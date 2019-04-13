import { QuizComponent } from './quiz.component';
import {ActivatedRoute, Router} from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { PPQRRoute } from './../../utils/constants';
import {QuizService} from "../services/quiz.service";

@Component({
  selector: 'app-pole-position-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class PolePositionQuizComponent extends QuizComponent {
  public constructor(
    @Inject('polePositionQuizService') quizService: QuizService,
    router: Router, activatedRoute: ActivatedRoute) { super(quizService, activatedRoute, router, PPQRRoute); }
}
