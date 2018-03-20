import { TestBed, inject } from '@angular/core/testing';

import { LibEventsService } from './lib-events.service';

describe('LibEventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LibEventsService]
    });
  });

  it('should be created', inject([LibEventsService], (service: LibEventsService) => {
    expect(service).toBeTruthy();
  }));
});
