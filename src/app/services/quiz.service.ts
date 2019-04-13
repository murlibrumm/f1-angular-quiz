import { WheelOfFortuneService } from './wheelOfFortune.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { randomIntFromInterval, shuffle } from '../../utils/utils';
import { ergastURL, raceResultsURL } from '../../utils/constants';
import { Question } from '../../models/question';
import 'rxjs/add/operator/map';


@Injectable()
export abstract class QuizService {

  protected _alreadyAsked: string[] = []; // idea: instead of tuple: YYYYRR (year+racenumber)
  protected _falseAnswerCount = 0;
  protected _correctAnswerCount = 0;
  protected _answeredQuestions: Question[] = [];
  protected _currentQuestion: Question;
  protected _yearRange: number[] = [1950, new Date().getFullYear()]; // those are the default values
  protected _numberOfQuestions: number = 5;

  protected constructor(private http: Http, private questionText: string) { }

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

  get numberOfQuestions(): number {
    return this._numberOfQuestions;
  }

  get yearRange(): number[] {
    return this._yearRange;
  }

  set yearRange(range) {
    this.setYearRangeMinMax(range, 1950, new Date().getFullYear());
  }

  set numberOfQuestions(noq: number) {
    this.setValidNumberOfQuestions(noq);
  }

  protected setValidNumberOfQuestions(noq: number) {
    this._numberOfQuestions = (noq > 0 && noq <= 40) ? noq : 5;
  }

  protected setYearRangeMinMax(range: number[], minYear: number, maxYear: number) {
    // validate input first
    if (range[0] > range[1]) {
      return;
    }
    if (range[0] < minYear) {
      range[0] = minYear;
    }
    if (range[1] > maxYear) {
      range[1] = maxYear;
    }
    if (range[0] > range[1]) {
      return;
    }
    this._yearRange = range;
  }

  public reset() {
    this._alreadyAsked       = [];
    this._falseAnswerCount   = 0;
    this._correctAnswerCount = 0;
    this._answeredQuestions  = [];
    this._currentQuestion    = null;
  }

  public quizFinished(): boolean {
    return this._numberOfQuestions === this._answeredQuestions.length;
  }

  public getCorrectPercentage() : number {
    if (this._correctAnswerCount + this._falseAnswerCount === 0) {
      return 0;
    }
    return (this._correctAnswerCount / (this._correctAnswerCount + this._falseAnswerCount)) * 100;
  }

  public answerQuestion(answerIndex: number) {
    this._currentQuestion.userAnswerIndex = answerIndex;
    // was the question answered correctly?
    if (this._currentQuestion.correctAnswerIndex === answerIndex) {
      console.log('correct answer');
      this._correctAnswerCount++;
    } else {
      console.log('false answer');
      this._falseAnswerCount++;
    }

    console.log('question answered');
    console.log(this._currentQuestion);
    // push to [] of answered questions
    this._answeredQuestions.push(this._currentQuestion);
  }

  // finds a question which we have not asked yet, generates answers to the question
  // (weighted by finishing position), and sets the currentQuestion.
  public async getNewQuestion(): Promise<Question> {
    // 1. get random season between the two years (standard: 1950 and current year)
    const year = randomIntFromInterval(this._yearRange[0], this._yearRange[1]);
    // 2. send the request
    const raceResults = await this.getApiResults(year, 1);

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
    const correctAnswer = this.getDriverName(raceResults.RaceTable.Races[raceNumber]);
    const selectedDrivers = this.selectDriversFromWheelOfFortune(listOfPoints, correctAnswer);

    // 7. create the question
    const raceName = raceResults.RaceTable.Races[raceNumber].raceName;
    return this.createQuestion(selectedDrivers, correctAnswer, `${this.questionText} ${year} ${raceName}?`);
  }

  protected selectDriversFromWheelOfFortune (listOfPoints: any[], correctAnswer: string): string[] {
    const wheelOfFortune = new WheelOfFortuneService(listOfPoints);
    const selectedDrivers = wheelOfFortune.selectFromWheelOfFortune(3);
    selectedDrivers.push(correctAnswer);
    return selectedDrivers;
  }

  protected createQuestion (driverArray: string[], correctAnswer: string, questionText: string): Promise<Question> {
    // shuffle answers & save new index of the correct answer
    shuffle(driverArray);

    // create question
    this._currentQuestion = new Question(
      questionText,
      driverArray,
      driverArray.indexOf(correctAnswer)
    );

    console.log(this._currentQuestion);
    return new Promise<Question>((resolve, reject) => {
      resolve(this._currentQuestion);
    });
  }


  private getRaceId(year: number, raceNumber: number) {
    return `${year}${raceNumber}`;
  }

  // async function is needed in combination with await!
  // await simply pauses the execution of the method until the value from the promise is available
  private async createListOfPoints(raceResults1: any, year: number, raceNumber: number): Promise<any> {
    // 5. now that we have found a race we have not used yet, we need to find
    // other podium finishers of that year for our answer possibilities.
    // so getData
    let [raceResults2, raceResults3, raceResults4] = // await all promises!
      await Promise.all([this.getApiResults(year, 2), this.getApiResults(year, 3), this.getApiResults(year, 4)]);
    const winnerName = this.getDriverName(raceResults1.RaceTable.Races[raceNumber]);

    raceResults1 = this.mapResultsToPoints(raceResults1.RaceTable.Races, 8);
    raceResults2 = this.mapResultsToPoints(raceResults2.RaceTable.Races, 4);
    raceResults3 = this.mapResultsToPoints(raceResults3.RaceTable.Races, 2);
    raceResults4 = this.mapResultsToPoints(raceResults4.RaceTable.Races, 1);

    const driversPointsList = raceResults1.concat(raceResults2).concat(raceResults3).concat(raceResults4);
    return this.reduceDriversPointsList(driversPointsList, winnerName);
  }

  protected reduceDriversPointsList (driversPointsList: (string|number)[][], correctAnswer: string): Promise<any> {
    // filter out all the columns with the correctAnswer
    driversPointsList = driversPointsList.filter((elem) => elem[0] !== correctAnswer);

    const reducedList = driversPointsList.reduce( (tally, result) => {
      tally[result[0]] = (tally[result[0]] || 0) + result[1] ; // if there is no index of the driver, add a new index with 0 points
      return tally;
    } , {});

    return new Promise((resolve, reject) => {
      resolve(reducedList);
    });
  }

  // returns an array with inner arrays [name, points] for each driver.
  private mapResultsToPoints(results: any, points: number): (string|number)[][] {
    return results.map((result) => [this.getDriverName(result), points]);
  }

  // helper for getting the drivername out of a result of a race.
  protected abstract getDriverName(raceResults: any): string;

  protected abstract getApiResults(year: number, finishingPosition: number): any;

  protected sendApiRequest(URL: string): any {
    return new Promise((resolve, reject) => {
      this.http.get(URL)
      .map((res) => res.json())
      .subscribe((data) => {
        resolve(data.MRData);
      }, error => reject(error));
    });
  }
}
