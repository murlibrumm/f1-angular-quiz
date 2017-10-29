import { Router } from '@angular/router';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-quiz-results',
  templateUrl: 'quizResults.component.html',
  styleUrls: ['./quizResults.component.css']

  /* TODO: does it make sense to have a seperate URL for the results? => dunno kev
  1) make results page
  2) we need to reset the service each time we NgOnInit a component (winner, poleposition, WC, statistics => so that we have a fresh quiz)
  3) implement different types of quizzes, think about what has to change @service.
      most parts will stay the same. just some parts need tweaking (URL for PP quiz), (URL + logic for selecting WCs for WC quiz)
  4) statistics, dropdown for different stats, we need a service, which stats, how to get em from the DB, etc */

})

export class QuizResultsComponent {
  constructor(
    @Inject('quizService') private quizService,
    @Inject('numberOfQuestions') private numberOfQuestions: number,
    private router: Router) {
      console.log(quizService.correctAnswerCount);
      console.log(quizService.currentQuestion);
  }
}
