import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/**
 * O evento de resize disparado pelo browser é chamado zilhões de vezes por segundo ao dar resize.
 * Este serviço suprime o disparo de eventos para uma quantidade menos dolorosa à cpu.
 */
@Injectable()
export class OptimizedResizeListenerService {
  private initialized = false;

  constructor() {}

  private init() {
    this.initialized = true;
    const throttle = function(type, name, obj?) {
      obj = obj || window;
      let running = false;
      const func = function() {
        if (running) {
          return;
        }
        running = true;
        requestAnimationFrame(function() {
          obj.dispatchEvent(new CustomEvent(name));
          running = false;
        });
      };
      obj.addEventListener(type, func);
    };

    throttle('resize', 'optimizedResize');
  }

  public onOptimizedResize(): Observable<any> {
    if (!this.initialized) {
      this.init();
    }
    return new Observable(observer => {
      window.addEventListener('optimizedResize', () => {
        observer.next();
      });
    });
  }
}
