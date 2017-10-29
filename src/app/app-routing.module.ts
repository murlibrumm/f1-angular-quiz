import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome.component';
import { WinnerQuizComponent } from './quizComponents/winnerQuiz.component';
import { PolePositionQuizComponent } from './quizComponents/polePositionQuiz.component';
import { WorldChampionQuizComponent } from './quizComponents/worldChampionQuiz.component';
import { StatisticsComponent } from './statistics.component';
import { WinnerQuizResultsComponent } from './resultComponents/winnerQuizResults.component';
import { PolePositionQuizResultsComponent } from './resultComponents/polePositionQuizResults.component';
import { WorldChampionQuizResultsComponent } from './resultComponents/worldChampionQuizResults.component';

import { WQRoute, PPQRoute, WCQRoute, WQRRoute, PPQRRoute, WCQRRoute,
  welcomeRoute, statisticsRoute } from './../utils/constants';

const appRoutes: Routes = [
  {
    path: welcomeRoute,
    component: WelcomeComponent,
  },
  {
    path: WQRoute,
    component: WinnerQuizComponent,
  },
  {
    path: PPQRoute,
    component: PolePositionQuizComponent,
  },
  {
    path: WCQRoute,
    component: WorldChampionQuizComponent,
    data: { preload: true }
  },
  {
    path: statisticsRoute,
    component: StatisticsComponent,
  },
  {
    path: WQRRoute,
    component: WinnerQuizResultsComponent,
  },
  {
    path: PPQRRoute,
    component: PolePositionQuizResultsComponent,
  },
  {
    path: WCQRRoute,
    component: WorldChampionQuizResultsComponent,
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true, // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRoutingModule { }
