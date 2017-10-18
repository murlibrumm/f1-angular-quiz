import { Question } from '../models/question';
import { Component, Inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Welcome to the F1-Quiz!';
  currentQuestion: Promise<Question>;
  answered: Boolean = false;

  // advantage via @Inject: we do not have to import the class WinnerQuizService here => no Dependency
  constructor(
    @Inject('quizService') private winnerQuizService,
    @Inject('numberOfQuestions') private numberOfQuestions: number) {
    winnerQuizService.yearRange = [2000, 2017];
    this.getNextQuestion();
  }

  async getNextQuestion() {
    // we do not need await here => await waits for the promise to be resolved, but we do not care, because our
    // template handles the promise for us (currentQuestions | async)
    // so actually, with await this would not work!
    this.currentQuestion = this.winnerQuizService.getNewQuestion();
    this.answered = false;
  }

  answerQuestion(index: number) {
    if (this.answered === true) {
      return;
    }
    this.answered = true;

    this.winnerQuizService.answerQuestion(index);
    if (this.numberOfQuestions === this.winnerQuizService.answeredQuestions.length) {
      console.log('finished asking questions!');
      return;
      // TODO: router => display results & which questions were wrong or right
    }
    this.getNextQuestion(); // otherwise get the next question

    // TODO:
    // is it best to have winnerQuizService.answeredQuestions & winnerQuizService.totalQuestions to check
    // if we have to request a new question?
  }
}
