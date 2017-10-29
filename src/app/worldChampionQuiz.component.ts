import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { Question } from '../models/question';

@Component({
  selector: 'app-world-champion-quiz',
  template: `
    <p>TODO</p>
  `
})

export class WorldChampionQuizComponent implements OnInit {
  constructor(
    @Inject('quizService') private quizService,
    @Inject('numberOfQuestions') private numberOfQuestions: number,
    private router: Router) { }

  ngOnInit() {
    this.quizService.reset();
    this.quizService.yearRange = [2000, 2017];
  }
}
