import { TestBed, inject } from '@angular/core/testing';

import { OptimizedResizeListenerService } from './optimized-resize-listener.service';

describe('OptimizedResizeListenerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OptimizedResizeListenerService]
    });
  });

  it('should be created', inject([OptimizedResizeListenerService], (service: OptimizedResizeListenerService) => {
    expect(service).toBeTruthy();
  }));
});
