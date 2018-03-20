import { ElementRef } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { SamHopscotchStepDirective } from './sam-hopscotch-step.directive';
import { HopsctochWrapperService } from '../../core/hopscotch-wrapper/hopscotch-wrapper.service';

describe('SamHopscotchStepDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ElementRef,
          useClass: {}
        },
        {
          provide: HopsctochWrapperService,
          useClass: {}
        }
      ]
    });
  });
  it('should create an instance', () => {
    inject([SamHopscotchStepDirective], (directive: SamHopscotchStepDirective) => {
      expect(directive).toBeTruthy();
    });
  });
});
