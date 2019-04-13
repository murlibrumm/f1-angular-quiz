import { QuizComponent } from './quiz.component';
import {ActivatedRoute, Router} from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import {PPQRRoute, WCQRRoute} from './../../utils/constants';
import {QuizService} from "../services/quiz.service";

@Component({
  selector: 'app-world-champion-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class WorldChampionQuizComponent extends QuizComponent {
  public constructor(
    @Inject('worldChampionQuizService') quizService: QuizService,
    router: Router, activatedRoute: ActivatedRoute) { super(quizService, activatedRoute, router, WCQRRoute); }
}
