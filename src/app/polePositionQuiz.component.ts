import { Router } from '@angular/router';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-pole-position-quiz',
  template: `
    <p>TODO</p>
  `
})

export class PolePositionQuizComponent {
  constructor(
    @Inject('quizService') private winnerQuizService,
    @Inject('numberOfQuestions') private numberOfQuestions: number,
    private router: Router) {
      console.log(winnerQuizService.correctAnswerCount);
      console.log(winnerQuizService.currentQuestion);
  }
}
