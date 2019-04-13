export class WheelOfFortuneService {

  private wheelOfFortune: any[] = [];
  constructor(private listOfPoints: {String: number}[]) { this.createWheelOfFortune(listOfPoints); }

  // returns a wheelOfFortune. Its an analogy from gambling. Each driver gets a share of a range from 0-1.
  // The better positions the driver has, the bigger his share on the wheel gets. Then we select a number from
  // 0-1 aka "spinning the wheel", and select a random driver.
  private createWheelOfFortune (listOfPoints: {String: number}[]) {
    // now the listOfPoints looks like this: {"Sebastian Vettel": 2, "Lewis Hamilton": 8, ...}
    // 1. we need to sum all the values of our List
    const sumPoints: number = Object.keys(listOfPoints).reduce(function (previous, driverName) {
      return previous + listOfPoints[driverName];
    }, 0);

    // 2. create a ranged array like: [{lowerBound: 0, upperBound: 0.123: driverName: 'Sebastian Vettel'},
    //  {lowerBound: 0.123, upperBound: 0.333, driverName: 'Lewis Hamilton'}, {lowerBound: 0.33 ...}, ...]
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
    this.wheelOfFortune = wheelOfFortune;
  }

  // select @quantity distinct entries from the wheelOfFortune
  public selectFromWheelOfFortune(quantity: number): string[] {
    const selectedDrivers: string[] = [];

    let selectedCount = 0;
    while (selectedCount < quantity) {
      const random = Math.random();
      for (let i = 0; i < this.wheelOfFortune.length; i++) {
        if (random >= this.wheelOfFortune[i].lowerBound && random < this.wheelOfFortune[i].upperBound) {
          const driverName = this.wheelOfFortune[i].driverName;
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
}
