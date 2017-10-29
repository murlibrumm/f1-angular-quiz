import { Router } from '@angular/router';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-quiz-results',
  templateUrl: 'quizResults.component.html',
  styleUrls: ['./quizResults.component.css']
})

export abstract class QuizResultsComponent {
  constructor(
    private quizService,
    private numberOfQuestions: number,
    private router: Router,
    private playAgainURL: String) {
      console.log(quizService.correctAnswerCount);
      console.log(quizService.currentQuestion);
  }
}
