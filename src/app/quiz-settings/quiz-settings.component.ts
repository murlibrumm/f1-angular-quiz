import {Component, OnInit} from '@angular/core';
import {QuizSettings} from "../../models/quizSettings";
import {ActivatedRoute, Router} from "@angular/router";
import {PPQRoute} from "../../utils/constants";

@Component({
  selector: 'app-quiz-settings',
  templateUrl: './quiz-settings.component.html',
  styleUrls: ['./quiz-settings.component.css']
})
export class QuizSettingsComponent implements OnInit {

  constructor(public router: Router, public activatedRoute: ActivatedRoute) {}

  Object = Object; // needed for Object.keys in template
  numberOfQuestions = [3, 5, 10, 20, 40];
  periods = {};
  model = new QuizSettings('all',5);

  onSubmit() {
    let routeParameters = {
      'numberOfQuestions': this.model._numberOfQuestions,
      'period': JSON.stringify(this.periods[this.model._period]),
    };
    this.router.navigate([this.activatedRoute.snapshot.paramMap.get('quiz'), routeParameters]);
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.get('quiz') === PPQRoute) {
      this.periods = {
        'all': [2003, 2019],
        '2003-2009': [2003, 2009],
        '2010-2019': [2010, 2019],
      }
    } else {
      this.periods = {
        'all': [1950, 2019],
        '50s': [1950, 1959],
        '60s': [1960, 1969],
        '70s': [1970, 1979],
        '80s': [1980, 1989],
        '90s': [1990, 1999],
        '2000-2009': [2000, 2009],
        '2010-2019': [2010, 2019],
      }
    }

  }

}
