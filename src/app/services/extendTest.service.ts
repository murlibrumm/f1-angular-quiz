import { TestService } from './test.service';
export class ExtendTestService extends TestService {
  constructor(brumm: String) { // without the private field decorator => so it is defined @SuperClass
    super(brumm);
  }

  protected calcSomeStuff() { // WTF why no override?
    return 1 + 1 + 2 + 3 + 4 + 5;
  }
}
