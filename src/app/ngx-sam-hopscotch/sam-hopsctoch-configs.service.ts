import { Injectable } from "@angular/core";
import { HopscotchStep } from "./hopscotch-step";
import { HopscotchTour } from "./hopscotch-tour";
import hopscotch from "hopscotch";
import { HopscotchConfigOption } from "./hopscotch-config-option";
import { Observable } from 'rxjs/Observable';
import { HopscotchState } from "./hopscotch-state";
import { LibEventsService } from "./lib-events.service";

/**
 * http://linkedin.github.io/hopscotch/#all-step-options
*/
@Injectable()
export class SamHopsctochConfigsService {
  private tour: HopscotchTour;
  private directiveCreatedSteps = 0;
  private directiveInitializedSteps = 0;

  constructor(public libEventsService: LibEventsService) {
    libEventsService.hopscotchStepCreated().subscribe(() => {
      this.directiveCreatedSteps++;
    });
    libEventsService.hopscotchStepInitialized().subscribe(() => {
      this.directiveInitializedSteps++;
    });
  }

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
    this.libEventsService.hopscotchStarted().emit();
    this.doStartTour(tour, stepNum);
  }

  private doStartTour(tour?: HopscotchTour, stepNum?: number) {
    if (this.directiveCreatedSteps > this.directiveInitializedSteps) {
      setTimeout(() => { this.doStartTour(tour, stepNum) }, 5);
    } else {
      if (stepNum !== undefined && tour !== undefined) {
        hopscotch.startTour(tour, stepNum);
      } else if (stepNum === undefined && tour === undefined) {
        hopscotch.startTour(this.getTour());
      } else if (stepNum !== undefined && tour === undefined) {
        hopscotch.startTour(this.getTour(), stepNum);
      } else if (stepNum === undefined && tour !== undefined) {
        hopscotch.startTour(tour);
      };
    }
  }

  public showStep(idx: number) {
    hopscotch.showStep(idx); //Skips to a given step in the tour
  }

  public prevStep() {
    hopscotch.prevStep(); //Goes back one step in the touropscotch.nextStep(); //Goes forward one step in the tour
  }

  public endTour(clearCookie?: boolean) {
    hopscotch.endTour(clearCookie === undefined ? false : clearCookie); //Ends the current tour. If clearCookie is set to false, the tour state is preserved. Otherwise, if clearCookie is set to true or is not provided, the tour state is cleared.
  }

  public configure(options: HopscotchConfigOption) {
    hopscotch.configure(options); //Sets options for running the tour. See above section "Setting tour options" for a list of configuration options.
  }

  public getCurrTour(): string {
    return hopscotch.getCurrTour(); //Returns the currently running tour.
  }

  public getCurrStepNum(): number {
    return parseInt(hopscotch.getCurrStepNum()); //Returns the current zero-based step number.
  }

  public getState(): HopscotchState {
    const state: string = hopscotch.getState();
    if (!state) {
      return undefined;
    }
    const splitted = state.split(':');
    if (splitted.length < 2) {
      return undefined;
    }
    return new HopscotchState(splitted[0], parseInt(splitted[1])); //Checks for tour state saved in sessionStorage/cookies and returns the state if it exists. Use this method to determine whether or not you should resume a tour.
  }

  public listen(event: 'start' | 'end' | 'next' | 'prev' | 'show' | 'close' | 'error'): Observable<any> {
    return new Observable(observer => {
      // Adds a callback for one of the event types.
      // Valid event types are:
      // *start*, *end*, *next*, *prev*, *show*, *close*, *error*
      hopscotch.listen(event, data => {
        observer.next(data);
      });
    })
  }

  public unlisten(event: 'start' | 'end' | 'next' | 'prev' | 'show' | 'close' | 'error'): Observable<any> {
    return new Observable(observer => {
      hopscotch.unlisten(event, data => {
        observer.next(data);
      }); //Removes a callback for one of the event types.
    })
  }

  public removeCallbacks(eventName?: 'start' | 'end' | 'next' | 'prev' | 'show' | 'close' | 'error', tourOnly?: boolean) {
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
    hopscotch.resetDefaultI18N(); //Resets i18n strings to original default values.
  }

  public resetDefaultOptions() {
    hopscotch.resetDefaultOptions(); //Resets all config options to original values.
  }

}
