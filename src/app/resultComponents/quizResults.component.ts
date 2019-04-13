import {ActivatedRoute, Router} from '@angular/router';
import {Component, Inject, OnInit} from '@angular/core';

@Component({
  selector: 'app-quiz-results',
  templateUrl: 'quizResults.component.html',
  styleUrls: ['./quizResults.component.css']
})

export abstract class QuizResultsComponent implements OnInit {
  constructor(
    private quizService,
    private numberOfQuestions: number,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private playAgainURL: string) {
      console.log(quizService.correctAnswerCount);
      console.log(quizService.currentQuestion);
  }

  public playAgainParameters = {};

  ngOnInit() {
    try {
      this.playAgainParameters['period'] = this.activatedRoute.snapshot.paramMap.get('period');
      this.playAgainParameters['numberOfQuestions'] = this.activatedRoute.snapshot.paramMap.get('numberOfQuestions');
    } finally {}

  }
}
