import { QuizService } from './quiz.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ergastURL, polePositionURL } from '../../utils/constants';
import { ppQuestion } from '../../utils/constants';
import 'rxjs/add/operator/map';


@Injectable()
export class PolePositionQuizService extends QuizService {

  protected _yearRange: number[] = [2003, new Date().getFullYear()]; // those are the default values

  constructor(http: Http) { super(http, ppQuestion); }

  set yearRange(range) {
    // validate input first
    if (range[0] > range[1]) {
      return;
    }
    if (range[0] < 2003) {
      range[0] = 2003;
    }
    if (range[1] > new Date().getFullYear()) {
      range[1] = new Date().getFullYear();
    }
    this._yearRange = range;
  }

  protected getApiResults(year: number, finishingPosition: number): any {
    return this.sendApiRequest(ergastURL + year + polePositionURL + finishingPosition + '.json');
  }

  protected getDriverName(raceResults: any): String {
    const driver = raceResults.QualifyingResults[0].Driver;
    return `${driver.givenName} ${driver.familyName}`;
  }
}
