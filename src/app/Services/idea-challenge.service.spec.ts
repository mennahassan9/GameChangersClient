import { TestBed, inject } from '@angular/core/testing';

import { IdeaChallengeService } from './idea-challenge.service';

describe('IdeaChallengeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IdeaChallengeService]
    });
  });

  it('should be created', inject([IdeaChallengeService], (service: IdeaChallengeService) => {
    expect(service).toBeTruthy();
  }));
});
