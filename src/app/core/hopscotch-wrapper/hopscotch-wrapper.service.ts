import { Injectable } from '@angular/core';
import hopscotch from 'hopscotch';
import { Observable } from 'rxjs/Observable';
import { HopscotchConfigOption } from '../model/hopscotch-config-option';
import { HopscotchStep } from '../model/hopscotch-step';
import { HopscotchTour } from '../model/hopscotch-tour';
import { HopscotchState } from '../model/hopscotch-state';

/**
 * http://linkedin.github.io/hopscotch/#all-step-options
 */
@Injectable()
export class HopsctochWrapperService {
  private tour: HopscotchTour;
  private options: HopscotchConfigOption;

  public addStep(step: HopscotchStep) {
    this.getTour().addStep(step);
  }

  public setTour(tour: HopscotchTour) {
    this.tour = tour;
  }

  public getTour(): HopscotchTour {
    if (!this.tour) {
      this.tour = new HopscotchTour();
    }
    return this.tour;
  }

  public startTour(tour?: HopscotchTour, stepNum?: number) {
    if (this.options && this.options.fadeBackground) {
      const backgroundCanvasId = 'ngx-sam-hopscotch-bg-canvas';
      let backgroundCanvasEl: HTMLCanvasElement;
      let backgroundCanvasCtx: CanvasRenderingContext2D;

      this.listen('show').subscribe(data => {
        const currStep = this.getTour().getSteps()[this.getCurrStepNum()];
        console.log(currStep);
        let targetStepEl = currStep.target;
        if (typeof targetStepEl === 'string') {
          try {
            targetStepEl = document.getElementById(targetStepEl) as HTMLElement;
          } catch (e) {
            // não é um HTMLElement válido, pula
          }
        }

        if (targetStepEl instanceof HTMLElement) {
          const targetElBoundingClientRect = targetStepEl.getBoundingClientRect();
          const devicePixelRatio = window.devicePixelRatio || 1;

          const prevCanvas = document.getElementById(backgroundCanvasId) as HTMLCanvasElement;

          if (prevCanvas) {
            this.updateCanvasMask(backgroundCanvasEl, backgroundCanvasCtx, targetElBoundingClientRect);
          } else {
            backgroundCanvasEl = document.createElement('canvas');
            backgroundCanvasCtx = backgroundCanvasEl.getContext('2d');

            backgroundCanvasEl.id = backgroundCanvasId;
            backgroundCanvasEl.style.cssText = `
              position: fixed;
              width: 100vw;
              height: 100vh;
              bottom: 0;
              left: 0;
              z-index: 1000;
              opacity: ${this.options.fadeBackgroundColorAlpha};
            `;
            backgroundCanvasEl.width = window.innerWidth * devicePixelRatio;
            backgroundCanvasEl.height = window.innerHeight * devicePixelRatio;
            backgroundCanvasCtx.scale(devicePixelRatio, devicePixelRatio);
            this.updateCanvasMask(backgroundCanvasEl, backgroundCanvasCtx, targetElBoundingClientRect);

            document.body.appendChild(backgroundCanvasEl);
          }

        }
      });

      this.listen('end').subscribe(data => {
        if (document.getElementById(backgroundCanvasId)) {
          document.body.removeChild(backgroundCanvasEl);
        }
      });
    }
    if (stepNum !== undefined && tour !== undefined) {
      this.setTour(tour);
      hopscotch.startTour(tour, stepNum);
    } else if (stepNum === undefined && tour === undefined) {
      hopscotch.startTour(this.getTour());
    } else if (stepNum !== undefined && tour === undefined) {
      hopscotch.startTour(this.getTour(), stepNum);
    } else if (stepNum === undefined && tour !== undefined) {
      this.setTour(tour);
      hopscotch.startTour(tour);
    }
  }

  private updateCanvasMask(backgroundCanvasMaskEl: HTMLCanvasElement,
    backgroundCanvasMaskCtx: CanvasRenderingContext2D,
    targetElBoundingClientRect: ClientRect) {
    // This color is the one of the filled shape
    backgroundCanvasMaskCtx.clearRect(0, 0, backgroundCanvasMaskEl.width, backgroundCanvasMaskEl.height);

    backgroundCanvasMaskCtx.globalCompositeOperation = 'xor';
    backgroundCanvasMaskCtx.fillStyle = this.options.fadeBackgroundColorHex || 'rgba(0, 0, 0, 1)';
    backgroundCanvasMaskCtx.fillRect(0, 0, backgroundCanvasMaskEl.width, backgroundCanvasMaskEl.height);

    backgroundCanvasMaskCtx.fillStyle = this.options.fadeBackgroundColorHex || 'rgba(0, 0, 0, 1)';
    backgroundCanvasMaskCtx.fillRect(
      targetElBoundingClientRect.left - 10,
      targetElBoundingClientRect.top - 10,
      targetElBoundingClientRect.width + 20,
      targetElBoundingClientRect.height + 20
    );
  }

  public showStep(idx: number) {
    hopscotch.showStep(idx); // Skips to a given step in the tour
  }

  public prevStep() {
    hopscotch.prevStep(); // Goes back one step in the touropscotch.nextStep(); // Goes forward one step in the tour
  }

  /**
   * Ends the current tour. If clearCookie is set to false, the tour state is preserved.
   * Otherwise, if clearCookie is set to true or is not provided, the tour state is cleared.
   */
  public endTour(clearCookie?: boolean) {
    hopscotch.endTour(clearCookie === undefined ? false : clearCookie);
  }

  /**
   * Sets options for running the tour.
   */
  public configure(options: HopscotchConfigOption) {
    this.options = options;
    hopscotch.configure(this.options);
  }

  public getCurrTour(): string {
    return hopscotch.getCurrTour(); // Returns the currently running tour.
  }

  /**
   * Returns the current zero-based step number.
   */
  public getCurrStepNum(): number {
    return parseInt(hopscotch.getCurrStepNum(), 10);
  }

  /**
   * Checks for tour state saved in sessionStorage/cookies and returns the state if it exists.
   * Use this method to determine whether or not you should resume a tour.
   */
  public getState(): HopscotchState {
    const state: string = hopscotch.getState();
    if (!state) {
      return undefined;
    }
    const splitted = state.split(':');
    if (splitted.length < 2) {
      return undefined;
    }
    return new HopscotchState(splitted[0], parseInt(splitted[1], 10));
  }

  public listen(
    event: 'start' | 'end' | 'next' | 'prev' | 'show' | 'close' | 'error'
  ): Observable<any> {
    return new Observable(observer => {
      // Adds a callback for one of the event types.
      // Valid event types are:
      // *start*, *end*, *next*, *prev*, *show*, *close*, *error*
      hopscotch.listen(event, data => {
        observer.next(data);
      });
    });
  }

  public unlisten(
    event: 'start' | 'end' | 'next' | 'prev' | 'show' | 'close' | 'error'
  ): Observable<any> {
    return new Observable(observer => {
      hopscotch.unlisten(event, data => {
        observer.next(data);
      }); // Removes a callback for one of the event types.
    });
  }

  public removeCallbacks(
    eventName?: 'start' | 'end' | 'next' | 'prev' | 'show' | 'close' | 'error',
    tourOnly?: boolean
  ) {
    // Remove callbacks for hopscotch events. If tourOnly is set to true,
    // only removes callbacks specified by a tour (callbacks set by
    // hopscotch.configure or hopscotch.listen will remain).
    // If eventName is null or undefined, callbacks for all events will be removed.
    if (eventName === undefined && tourOnly === undefined) {
      hopscotch.removeCallbacks();
    } else if (eventName !== undefined && tourOnly !== undefined) {
      hopscotch.removeCallbacks(eventName, tourOnly);
    } else if (eventName === undefined || tourOnly !== undefined) {
      hopscotch.removeCallbacks(tourOnly);
    } else if (eventName !== undefined || tourOnly === undefined) {
      hopscotch.removeCallbacks(eventName);
    }
  }

  public registerHelper(id: string, helperFn: Function) {
    hopscotch.registerHelper(id, helperFn);
  }

  public resetDefaultI18N() {
    hopscotch.resetDefaultI18N(); // Resets i18n strings to original default values.
  }

  public resetDefaultOptions() {
    hopscotch.resetDefaultOptions(); // Resets all config options to original values.
  }
}
