export class Question {
  private _correct = false;
  private _userAnswerIndex = -1;

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

  get userAnswerIndex () {
      return this._userAnswerIndex;
  }

  set userAnswerIndex (index: number) {
      if (index >= 0 && index < 4) {
        this._userAnswerIndex = index;
      }
  }

  get correct () {
      return this._correct;
  }

  set correct (value: boolean) {
      this._correct = value;
  }
}
