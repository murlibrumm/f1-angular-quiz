import { QuizService } from './quiz.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ergastURL, raceResultsURL } from '../../utils/constants';
import 'rxjs/add/operator/map';


@Injectable()
export class WinnerQuizService extends QuizService {

  constructor(http: Http) { super(http, 'Which driver won the'); }

  protected getApiResults(year: number, finishingPosition: number): any {
    return this.sendApiRequest(ergastURL + year + raceResultsURL + finishingPosition + '.json');
  }

  protected getDriverName(raceResults: any): String {
    const driver = raceResults.Results[0].Driver;
    return `${driver.givenName} ${driver.familyName}`;
  }
}
