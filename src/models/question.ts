export class Question {
  private _correct: Boolean;

  constructor(private _question: String, private _answers: String[], private _correctAnswerIndex: number) {}

  toString() {
    return `${this._question} ${this._answers} ${this._correctAnswerIndex} ${this._correct}`;
  }

  get question () {
      return this._question;
  }

  get answers () {
      return this._answers;
  }

  get correctAnswerIndex () {
      return this._correctAnswerIndex;
  }

  get correct () {
      return this._correct;
  }

  set correct (value: Boolean) {
      this._correct = value;
  }
}
