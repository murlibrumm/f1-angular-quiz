import { TestBed, inject } from '@angular/core/testing';

import { WinnerQuizService } from './winner-quiz.service';

describe('WinnerQuizService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WinnerQuizService]
    });
  });

  it('should be created', inject([WinnerQuizService], (service: WinnerQuizService) => {
    expect(service).toBeTruthy();
  }));
});
