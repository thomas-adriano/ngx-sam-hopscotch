import { TestBed, inject } from '@angular/core/testing';
import { HopsctochWrapperService } from './hopscotch-wrapper.service';
import { OptimizedResizeListenerService } from '../optimized-resize-listener/optimized-resize-listener.service';

describe('HopsctochWrapperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HopsctochWrapperService,
        {
          provide: OptimizedResizeListenerService,
          useClass: function() {
            return {};
          }
        }
      ]
    });
  });

  it(
    'should be created',
    inject([HopsctochWrapperService], (service: HopsctochWrapperService) => {
      expect(service).toBeTruthy();
    })
  );
});
