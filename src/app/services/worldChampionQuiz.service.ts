import { QuizService } from './quiz.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ergastURL, worldChampionURL, wdcQuestion } from '../../utils/constants';
import { randomIntFromInterval, shuffle } from '../../utils/utils';
import { Question } from '../../models/question';
import { WheelOfFortuneService } from './wheelOfFortune.service';
import 'rxjs/add/operator/map';


@Injectable()
export class WorldChampionQuizService extends QuizService {

  constructor(http: Http) { super(http, wdcQuestion); }

  protected getApiResults(year: number): any {
    return this.sendApiRequest(ergastURL + year + worldChampionURL + '.json?limit=4'); // Top 4 of the year
  }

  protected getDriverName(wdcResults: any): String {
    const driver = wdcResults.Driver;
    return `${driver.givenName} ${driver.familyName}`;
  }

  // finds a question which we have not asked yet, generates answers to the question
  // (weighted by finishing position), and sets the currentQuestion.
  async getNewQuestion(): Promise<Question> {
    let year = -1;
    for (let tries = 0; tries < 100; tries++) {
      // 1. get random season between the two years (standard: 1950 and current year)
      const randomYear = randomIntFromInterval(this._yearRange[0], this._yearRange[1]);

      if (!this._alreadyAsked.includes(randomYear.toString())) {
        year = randomYear;
        break;
      }
    }

    // 2. fallback (we could not find a race which we didn't already ask)
    if (year === -1) {
      return;
    }
    this._alreadyAsked.push(year.toString());

    // 3. get wdcResults of our selected year
    const wdcResults = await this.getApiResults(year);
    console.log(wdcResults.StandingsTable.StandingsLists[0].DriverStandings[0]);
    const wdcWinnerName = this.getDriverName(wdcResults.StandingsTable.StandingsLists[0].DriverStandings[0]);

    // 4. create list of points for all drivers who finished p1-p4 in the wdc in the surrounding years (weighted)
    const listOfPoints = await this.createListOfWdcPoints(wdcResults, wdcWinnerName, year);

    // 5. create wheel of fortune
    const wheelOfFortune = new WheelOfFortuneService(listOfPoints);
    const selectedDrivers = wheelOfFortune.selectFromWheelOfFortune(3);
    selectedDrivers.push(wdcWinnerName);

    // shuffle answers & save new index of the correct answer
    shuffle(selectedDrivers);

    // create question
    this._currentQuestion = new Question(
      `${wdcQuestion} ${year}?`,
      selectedDrivers,
      selectedDrivers.indexOf(wdcWinnerName)
    );

    console.log(this._currentQuestion);
    return new Promise<Question>((resolve, reject) => {
      resolve(this._currentQuestion);
    });

  }

  // async function is needed in combination with await!
  // await simply pauses the execution of the method until the value from the promise is available
  private async createListOfWdcPoints(wdcResults: any, wdcWinnerName: String, year: number): Promise<any> {
    // get WDC- stats from our year, and the 2 years before and after
    const [wdcResultsM2, wdcResultsM1, wdcResultsP1, wdcResultsP2] = // await all promises!
      await Promise.all([this.getApiResults(year - 2), this.getApiResults(year - 1),
        this.getApiResults(year + 1), this.getApiResults(year + 2)]);

    const wdcArray: any[] = [];
    if (wdcResults.StandingsTable.StandingsLists.length !== 0) {
      wdcArray.push(this.mapResultsToWdcPoints(wdcResults.StandingsTable.StandingsLists[0].DriverStandings));
    }
    if (wdcResultsM1.StandingsTable.StandingsLists.length !== 0) {
      wdcArray.push(this.mapResultsToWdcPoints(wdcResultsM1.StandingsTable.StandingsLists[0].DriverStandings));
    }
    if (wdcResultsP1.StandingsTable.StandingsLists.length !== 0) {
      wdcArray.push(this.mapResultsToWdcPoints(wdcResultsP1.StandingsTable.StandingsLists[0].DriverStandings));
    }
    if (wdcResultsM2.StandingsTable.StandingsLists.length !== 0) {
      wdcArray.push(this.mapResultsToWdcPoints(wdcResultsM2.StandingsTable.StandingsLists[0].DriverStandings));
    }
    if (wdcResultsP2.StandingsTable.StandingsLists.length !== 0) {
      wdcArray.push(this.mapResultsToWdcPoints(wdcResultsP2.StandingsTable.StandingsLists[0].DriverStandings));
    }

    console.log(wdcArray);
    let driversPointsArray = this.getDistinctDrivers(wdcArray, 4);
    console.log(driversPointsArray);

    // filter out all the columns with the actual WDC winner
    driversPointsArray = driversPointsArray.filter((elem) => elem[0] !== wdcWinnerName);
    console.log(driversPointsArray);

    const reducedList = driversPointsArray.reduce( (tally, result) => {
      tally[result[0]] = (tally[result[0]] || 0) + result[1] ; // if there is no index of the driver, add a new index with 0 points
      return tally;
    } , {});

    return new Promise((resolve, reject) => {
      resolve(reducedList);
    });
  }

  private getDistinctDrivers(wdcArray: any[], numberOfDrivers: number): any[] {
    const driversPointsArray: any[] = [];
    const distinctDrivers: String[] = [];
    // get the amount of places needed
    for (let wdcPosition = 0; wdcPosition < 4; wdcPosition++) {
      // add WDC[i] from all our years to our complete list
      for (let yearIndex = 0; yearIndex < wdcArray.length; yearIndex++) {
        const driver = wdcArray[yearIndex][wdcPosition];
        if (!distinctDrivers.includes(driver[0])) { // a new driver!
          distinctDrivers.push(driver[0]);
        }
        driversPointsArray.push(wdcArray[yearIndex][wdcPosition]);
        if (distinctDrivers.length === numberOfDrivers) {
          return driversPointsArray;
        }
      }
    }
  }

  // returns an array with inner arrays [name, points] for each driver.
  private mapResultsToWdcPoints(results: any): (string|number)[][] {
    const pointsForWdcPos = [18, 6, 2, 1];
    return results.map((result, index) => [this.getDriverName(result), pointsForWdcPos[index]]);
  }
}