import { TestBed, inject } from '@angular/core/testing';

import { SamHopsctochConfigsService } from './sam-hopsctoch-configs.service';

describe('SamHopsctochConfigsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SamHopsctochConfigsService]
    });
  });

  it('should be created', inject([SamHopsctochConfigsService], (service: SamHopsctochConfigsService) => {
    expect(service).toBeTruthy();
  }));
});
