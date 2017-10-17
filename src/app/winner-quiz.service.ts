import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { randomIntFromInterval } from '../utils/utils';
import { ergastURL, raceResultsURL } from '../utils/constants';
import { Question } from '../models/question';


@Injectable()
export class WinnerQuizService {

  private _numberOfQuestions: number;
  private _alreadyAsked: String[] = []; // idea: instead of tuple: YYYYRR (year+racenumber)
  private _falseAnswerCount: number;
  private _correctAnswerCount: number;
  private _answeredQuestions: Question[] = [];
  private _currentQuestion: Question;

  constructor(private http: Http) { }

  init (numberOfQuestions: number) {
    this._numberOfQuestions = numberOfQuestions;
  }

  get currentQuestion() {
    return this._currentQuestion;
  }

  get falseAnswerCount() {
    return this._falseAnswerCount;
  }

  get correctAnswerCount() {
    return this._correctAnswerCount;
  }

  get answeredQuestions() {
    return this._answeredQuestions;
  }


  answerQuestion(answerIndex: number) {
    // was the question answered correctly?
    if (this._currentQuestion.correctAnswerIndex === answerIndex) {
      this._correctAnswerCount++;
      this._currentQuestion.correct = true;
    } else {
      this._falseAnswerCount++;
      this._currentQuestion.correct = false;
    }
    // push to [] of answered questions
    this._answeredQuestions.push(this._currentQuestion);
  }

  // finds a question which we have not asked yet, generates answers to the question
  // (weighted by finishing position), and sets the currentQuestion.
  async getNewQuestion(): Promise<any> {
    // 1. get random season between 1950 and current year
    const year = randomIntFromInterval(1950, new Date().getFullYear()); // TODO: those two could be parameters
    // 2. send the request
    const raceResults = await this.getRaceResults(year, 1);

    // 3. get random race in the season, and make sure that we did not ask this race already!
    const numberOfRaces = raceResults.total;
    let raceNumber = -1;
    for (let tries = 0; tries < 6; tries++) {
      const randomRace = randomIntFromInterval(1, numberOfRaces) - 1;
      if (!this._alreadyAsked.includes(this.getRaceId(year, randomRace))) {
        raceNumber = randomRace;
        break;
      }
    }

    // 4. fallback (we could not find a race which we didn't already ask)
    if (raceNumber === -1) {
      this.getNewQuestion();
      return;
    }
    this._alreadyAsked.push(this.getRaceId(year, raceNumber));

    // 5. create list of points for all drivers who finished p1-p4 in this year
    const listOfPoints = await this.createListOfPoints(raceResults, year, raceNumber);
    // 6. create wheel of fortune (weighted, so win= 8p, 2nd = 4p, 3rd = 2p, 4th = 1p)
    const wheelOfFortune = this.createWheelOfFortune(listOfPoints);

    const selectedDrivers = this.selectFromWheelOfFortune(3, wheelOfFortune);
    const correctAnswer = this.getDriverName(raceResults.RaceTable.Races[raceNumber]);
    selectedDrivers.push(correctAnswer);

    // shuffle answers & save new index of the correct answer
    this.shuffle(selectedDrivers);

    // create question
    const raceName = raceResults.RaceTable.Races[raceNumber].raceName;
    this._currentQuestion = new Question(
      `Which driver won the ${year} ${raceName}?`,
      selectedDrivers,
      selectedDrivers.indexOf(correctAnswer)
    );

    console.log(this._currentQuestion);
    return new Promise((resolve, reject) => {
      resolve(this._currentQuestion);
    });

  }


  private getRaceId(year: number, raceNumber: number) {
    return `${year}${raceNumber}`;
  }

  // TODO: externalize
  // shuffles an array. Side effects!
  private shuffle(a: any[]) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
  }

  private selectFromWheelOfFortune(quantity: number, wheelOfFortune: any[]): String[] {
    const selectedDrivers: String[] = [];

    let selectedCount = 0;
    while (selectedCount < quantity) {
      const random = Math.random();
      for (let i = 0; i < wheelOfFortune.length; i++) {
        if (random >= wheelOfFortune[i].lowerBound && random < wheelOfFortune[i].upperBound) {
          const driverName = wheelOfFortune[i].driverName;
          if (selectedDrivers.includes(driverName)) { // do not select the same driver twice!
            break;
          }
          selectedDrivers.push(driverName);
          selectedCount++;
          break;
        }
      }
    }

    return selectedDrivers;
  }

  // async function is needed in combination with await!
  // await simply pauses the execution of the method until the value from the promise is available
  private async createListOfPoints(raceResults1: any, year: number, raceNumber: number): Promise<any> {
    // 5. now that we have found a race we have not used yet, we need to find
    // other podium finishers of that year for our answer possibilities.
    // so getData
    let [raceResults2, raceResults3, raceResults4] = // await all promises!
      await Promise.all([this.getRaceResults(year, 2), this.getRaceResults(year, 3), this.getRaceResults(year, 4)]);
    const winnerName = this.getDriverName(raceResults1.RaceTable.Races[raceNumber]);

    raceResults1 = this.mapResultsToPoints(raceResults1.RaceTable.Races, 8);
    raceResults2 = this.mapResultsToPoints(raceResults2.RaceTable.Races, 4);
    raceResults3 = this.mapResultsToPoints(raceResults3.RaceTable.Races, 2);
    raceResults4 = this.mapResultsToPoints(raceResults4.RaceTable.Races, 1);

    let completeList = raceResults1.concat(raceResults2).concat(raceResults3).concat(raceResults4);

    // filter out all the columns with the actual race winner.
    completeList = completeList.filter((elem) => elem[0] !== winnerName);

    const reducedList = completeList.reduce( (tally, result) => {
      tally[result[0]] = (tally[result[0]] || 0) + result[1] ; // if there is no index of the driver, add a new index with 0 points
      return tally;
    } , {});

    // filter out all the columns with the actual race winner.
    return new Promise((resolve, reject) => {
      resolve(reducedList);
    });
  }

  // returns an array with inner arrays [name, points] for each driver.
  private mapResultsToPoints(results: any, points: number): (string|number)[][] {
    return results.map((result) => [this.getDriverName(result), points]);
  }

  // helper for getting the drivername out of a result of a race.
  private getDriverName(raceResults: any): String {
    const driver = raceResults.Results[0].Driver;
    return `${driver.givenName} ${driver.familyName}`;
  }

  // returns a wheelOfFortune. Its an analogy from gambling. Each driver gets a share of a range from 0-1.
  // The better positions the driver has, the bigger his share on the wheel gets. Then we select a number from
  // 0-1 aka "spinning the wheel", and select a random driver.
  private createWheelOfFortune (listOfPoints: {String: number}[]): Object[] {
    // now the listOfPoints looks like this: {"Sebastian Vettel": 2, "Lewis Hamilton": 8, ...}
    // 1. we need to sum all the values of our List
    const sumPoints: number = Object.keys(listOfPoints).reduce(function (previous, driverName) {
      return previous + listOfPoints[driverName];
    }, 0);

    // TODO: i guess a list is better here, inside either an array [number, string], or some object.
    // 2. create a ranged array like: [{0: 'Sebastian Vettel'}, {0.123: 'Lewis Hamilton'}, {0.33: 'Kimi Raikkonen'}, ...]
    const wheelOfFortune: Object[] = [];
    let lowerBound = 0;
    let counter = 0;
    for (const driverName of Object.keys(listOfPoints)) {
      let upperBound = lowerBound + listOfPoints[driverName] / sumPoints;
      if (counter === Object.keys(listOfPoints).length - 1) {
        upperBound = 1;
      }
      wheelOfFortune.push({lowerBound, upperBound, driverName});
      lowerBound = upperBound;
      counter++;
    }
    return wheelOfFortune;
  }

  private getRaceResults(year: number, finishingPosition: number): any {
    return new Promise((resolve, reject) => {
      this.http.get(ergastURL + year + raceResultsURL + finishingPosition + '.json')
      .map((res) => res.json())
      .subscribe((data) => {
        resolve(data.MRData);
      }, error => reject(error));
    });
  }
}
