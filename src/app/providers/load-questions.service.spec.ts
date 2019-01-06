import { TestBed } from '@angular/core/testing';

import { LoadQuestionsService } from './load-questions.service';

describe('LoadQuestionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadQuestionsService = TestBed.get(LoadQuestionsService);
    expect(service).toBeTruthy();
  });
});
