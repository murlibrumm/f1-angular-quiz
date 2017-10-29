import { QuizService } from './quiz.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ergastURL, polePositionURL } from '../../utils/constants';
import { ppQuestion } from '../../utils/constants';
import 'rxjs/add/operator/map';


@Injectable()
export class PolePositionQuizService extends QuizService {

  constructor(http: Http) { super(http, ppQuestion); }

  protected getApiResults(year: number, finishingPosition: number): any {
    return this.sendApiRequest(ergastURL + year + polePositionURL + finishingPosition + '.json');
  }

  protected getDriverName(raceResults: any): String {
    const driver = raceResults.QualifyingResults[0].Driver;
    return `${driver.givenName} ${driver.familyName}`;
  }
}
