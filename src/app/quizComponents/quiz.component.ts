import { Router } from '@angular/router';
import { Question } from '../../models/question';
import { Component, Inject, OnInit } from '@angular/core';

export abstract class QuizComponent implements OnInit {
  title = 'Welcome to the F1-Quiz!';
  currentQuestion: Promise<Question>;
  answered = false;

  // advantage via @Inject: we do not have to import the class QuizService here => no Dependency
  constructor(
    private quizService,
    private numberOfQuestions: number,
    private router: Router,
    private resultURL: String) { }

  ngOnInit() {
    this.quizService.reset();
    this.quizService.yearRange = [2000, 2017];
    this.getNextQuestion();
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
      this.router.navigate([this.resultURL]);
      return;
      // TODO: router => display results & which questions were wrong or right
    }
    this.getNextQuestion(); // otherwise get the next question

    // TODO:
    // is it best to have winnerQuizService.answeredQuestions & winnerQuizService.totalQuestions to check
    // if we have to request a new question?
  }
}
