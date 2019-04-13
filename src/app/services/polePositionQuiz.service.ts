import { QuizService } from './quiz.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ergastURL, polePositionURL } from '../../utils/constants';
import { ppQuestion } from '../../utils/constants';


@Injectable()
export class PolePositionQuizService extends QuizService {

  protected _yearRange: number[] = [2003, new Date().getFullYear()]; // those are the default values

  constructor(http: Http) { super(http, ppQuestion); }

  get yearRange(): number[] {
    return this._yearRange;
  }

  set yearRange(range) {
    this.setYearRangeMinMax(range, 2003, new Date().getFullYear());
  }

  protected getApiResults(year: number, finishingPosition: number): any {
    return this.sendApiRequest(ergastURL + year + polePositionURL + finishingPosition + '.json');
  }

  protected getDriverName(raceResults: any): string {
    const driver = raceResults.QualifyingResults[0].Driver;
    return `${driver.givenName} ${driver.familyName}`;
  }
}
