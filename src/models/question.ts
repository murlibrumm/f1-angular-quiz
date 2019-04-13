export class Question {
  private _userAnswerIndex = -1;

  constructor(private _question: string, private _answers: string[], private _correctAnswerIndex: number) {}

  toString() {
    return `${this._question} ${this._answers} ${this._correctAnswerIndex} ${this.isCorrect()}`;
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

  isCorrect () {
      return this._userAnswerIndex === this._correctAnswerIndex;
  }
}
