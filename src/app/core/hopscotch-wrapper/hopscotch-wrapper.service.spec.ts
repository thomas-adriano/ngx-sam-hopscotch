import { TestBed, inject } from '@angular/core/testing';
import { HopsctochWrapperService } from './hopscotch-wrapper.service';

describe('HopsctochWrapperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HopsctochWrapperService]
    });
  });

  it(
    'should be created',
    inject([HopsctochWrapperService], (service: HopsctochWrapperService) => {
      expect(service).toBeTruthy();
    })
  );
});
