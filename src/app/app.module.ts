import { WinnerQuizService } from './winner-quiz.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
  ],
  providers: [
    {provide: 'quizService', useClass: WinnerQuizService},
    {provide: 'numberOfQuestions', useValue: 10},
 ], // Dependency Injection!
  bootstrap: [AppComponent]
})
export class AppModule { }
