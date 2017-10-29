import { QuizService } from './quiz.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';

import { WelcomeComponent } from './welcome.component';
import { WinnerQuizComponent } from './winnerQuiz.component';
import { PolePositionQuizComponent } from './polePositionQuiz.component';
import { WorldChampionQuizComponent } from './worldChampionQuiz.component';
import { StatisticsComponent } from './statistics.component';
import { QuizResultsComponent } from './quizResults.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    WinnerQuizComponent,
    PolePositionQuizComponent,
    WorldChampionQuizComponent,
    StatisticsComponent,
    QuizResultsComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [ // Dependency Injection!
    {provide: 'quizService', useClass: QuizService},
    {provide: 'numberOfQuestions', useValue: 2},
 ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
