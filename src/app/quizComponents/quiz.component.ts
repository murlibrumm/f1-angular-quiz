import {ActivatedRoute, Router} from '@angular/router';
import { Question } from '../../models/question';
import { Component, Inject, OnInit } from '@angular/core';
import {QuizService} from "../services/quiz.service";

export abstract class QuizComponent implements OnInit {
  private title = 'Welcome to the F1-Quiz!';
  private currentQuestion: Promise<Question>;
  private answered = false;

  // advantage via @Inject: we do not have to import the class QuizService here => no Dependency
  protected constructor(
    private quizService: QuizService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private resultURL: string) { }

  ngOnInit() {
    this.quizService.reset();
    try {
      this.quizService.yearRange = JSON.parse(this.activatedRoute.snapshot.paramMap.get('period'));
      this.quizService.numberOfQuestions = parseInt(this.activatedRoute.snapshot.paramMap.get('numberOfQuestions'));
    } finally {}
    console.log(this.quizService.yearRange);
    console.log(this.quizService.numberOfQuestions);
    this.getNextQuestion();
  }

  private getNextQuestion() {
    // we do not need await here => await waits for the promise to be resolved, but we do not care, because our
    // template handles the promise for us (currentQuestions | async)
    // so actually, with await this would not work!
    this.currentQuestion = this.quizService.getNewQuestion();
    console.log(this.quizService.correctAnswerCount);
    this.answered = false;
  }

  private answerQuestion(index: number) {
    if (this.answered === true) {
      return;
    }
    this.answered = true;

    this.quizService.answerQuestion(index);
    if (this.quizService.quizFinished()) {
      console.log('finished asking questions!');
      console.log(this.quizService.yearRange);
      let resultParameters = {
        'numberOfQuestions': this.quizService.numberOfQuestions,
        'period': JSON.stringify(this.quizService.yearRange),
      };
      this.router.navigate([this.resultURL, resultParameters]);
      return;
    }
    this.getNextQuestion(); // otherwise get the next question

    // TODO:
    // is it best to have winnerQuizService.answeredQuestions & winnerQuizService.totalQuestions to check
    // if we have to request a new question?
  }
}
