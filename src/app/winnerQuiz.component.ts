import { Router } from '@angular/router';
import { Question } from '../models/question';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-winner-quiz',
  templateUrl: './winnerQuiz.component.html',
  styleUrls: ['./winnerQuiz.component.css']
})

export class WinnerQuizComponent implements OnInit {
  title = 'Welcome to the F1-Quiz!';
  currentQuestion: Promise<Question>;
  answered = false;

  // advantage via @Inject: we do not have to import the class WinnerQuizService here => no Dependency
  constructor(
    @Inject('quizService') private quizService,
    @Inject('numberOfQuestions') private numberOfQuestions: number,
    private router: Router) {
      console.log("CONSTRUCTOR");
  }

  ngOnInit() {
    this.quizService.yearRange = [2000, 2017];
    this.getNextQuestion();
    console.log("NGONINIT"); // TODO: REMOVE ME; CONSTR + NGONINIT werden beide gecallt bei jedem laden der route winnerQuizComponent
  }

  getNextQuestion() {
    // we do not need await here => await waits for the promise to be resolved, but we do not care, because our
    // template handles the promise for us (currentQuestions | async)
    // so actually, with await this would not work!
    this.currentQuestion = this.quizService.getNewQuestion();
    console.log(this.quizService.correctAnswerCount);
    this.answered = false;
  }

  answerQuestion(index: number) {
    if (this.answered === true) {
      return;
    }
    this.answered = true;

    this.quizService.answerQuestion(index);
    if (this.numberOfQuestions === this.quizService.answeredQuestions.length) {
      console.log('finished asking questions!');
      this.router.navigate(['/quizResults']);
      return;
      // TODO: router => display results & which questions were wrong or right
    }
    this.getNextQuestion(); // otherwise get the next question

    // TODO:
    // is it best to have winnerQuizService.answeredQuestions & winnerQuizService.totalQuestions to check
    // if we have to request a new question?
  }
}
