import { WinnerQuizService } from './services/winnerQuiz.service';
import { PolePositionQuizService } from './services/polePositionQuiz.service';
import { WorldChampionQuizService } from './services/worldChampionQuiz.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';

import { WelcomeComponent } from './welcome.component';
import { WinnerQuizComponent } from './quizComponents/winnerQuiz.component';
import { PolePositionQuizComponent } from './quizComponents/polePositionQuiz.component';
import { WorldChampionQuizComponent } from './quizComponents/worldChampionQuiz.component';
import { StatisticsComponent } from './statistics.component';
import { WinnerQuizResultsComponent } from './resultComponents/winnerQuizResults.component';
import { PolePositionQuizResultsComponent } from './resultComponents/polePositionQuizResults.component';
import { WorldChampionQuizResultsComponent } from './resultComponents/worldChampionQuizResults.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    WinnerQuizComponent,
    PolePositionQuizComponent,
    WorldChampionQuizComponent,
    StatisticsComponent,
    WinnerQuizResultsComponent,
    PolePositionQuizResultsComponent,
    WorldChampionQuizResultsComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [ // Dependency Injection!
    {provide: 'winnerQuizService', useClass: WinnerQuizService},
    {provide: 'polePositionQuizService', useClass: PolePositionQuizService},
    {provide: 'worldChampionQuizService', useClass: WorldChampionQuizService},
    {provide: 'numberOfQuestions', useValue: 2},
 ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
