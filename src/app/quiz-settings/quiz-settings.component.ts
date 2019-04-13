import {Component} from '@angular/core';
import {QuizSettings} from "../../models/quizSettings";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-quiz-settings',
  templateUrl: './quiz-settings.component.html',
  styleUrls: ['./quiz-settings.component.css']
})
export class QuizSettingsComponent {

  public quizRoute: String;

  constructor(public router: Router, public activatedRoute: ActivatedRoute) {}

  Object = Object; // needed for Object.keys in template
  numberOfQuestions = [3, 5, 10, 20, 40];
  periods = {
    'all': [1950, 2019],
    '50s': [1950, 1959],
    '60s': [1960, 1969],
    '70s': [1970, 1979],
    '80s': [1980, 1989],
    '90s': [1990, 1999],
    '2000-2009': [2000, 2009],
    '2010-2019': [2010, 2019],
  };
  model = new QuizSettings('all',5);
  submitted = false; // TODO

  onSubmit() { this.router.navigate([this.activatedRoute.snapshot.paramMap.get('quiz')]); }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

}
