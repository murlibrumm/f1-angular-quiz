import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome.component';
import { WinnerQuizComponent } from './winnerQuiz.component';
import { PolePositionQuizComponent } from './polePositionQuiz.component';
import { WorldChampionQuizComponent } from './worldChampionQuiz.component';
import { StatisticsComponent } from './statistics.component';


const appRoutes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'polePositionQuiz',
    component: PolePositionQuizComponent,
  },
  {
    path: 'worldChampionQuiz',
    component: WorldChampionQuizComponent,
    data: { preload: true }
  },
  {
    path: 'winnerQuiz',
    component: WinnerQuizComponent,
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
  },
  //{ path: '**', component: PageNotFoundComponent }
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
