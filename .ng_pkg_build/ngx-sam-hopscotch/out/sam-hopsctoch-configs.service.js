/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from "@angular/core";
import { HopscotchTour } from "./hopscotch-tour";
import hopscotch from "hopscotch";
import { Observable } from 'rxjs/Observable';
import { HopscotchState } from "./hopscotch-state";
import { LibEventsService } from "./lib-events.service";
/**
 * http://linkedin.github.io/hopscotch/#all-step-options
 */
export class SamHopsctochConfigsService {
    /**
     * @param {?} libEventsService
     */
    constructor(libEventsService) {
        this.libEventsService = libEventsService;
        this.directiveCreatedSteps = 0;
        this.directiveInitializedSteps = 0;
        libEventsService.hopscotchStepCreated().subscribe(() => {
            this.directiveCreatedSteps++;
        });
        libEventsService.hopscotchStepInitialized().subscribe(() => {
            this.directiveInitializedSteps++;
        });
    }
    /**
     * @param {?} step
     * @return {?}
     */
    addStep(step) {
        this.getTour().addStep(step);
    }
    /**
     * @param {?} tour
     * @return {?}
     */
    setTour(tour) {
        this.tour = tour;
    }
    /**
     * @return {?}
     */
    getTour() {
        if (!this.tour) {
            this.tour = new HopscotchTour();
        }
        return this.tour;
    }
    /**
     * @param {?=} tour
     * @param {?=} stepNum
     * @return {?}
     */
    startTour(tour, stepNum) {
        this.libEventsService.hopscotchStarted().emit();
        this.doStartTour(tour, stepNum);
    }
    /**
     * @param {?=} tour
     * @param {?=} stepNum
     * @return {?}
     */
    doStartTour(tour, stepNum) {
        if (this.directiveCreatedSteps > this.directiveInitializedSteps) {
            setTimeout(() => { this.doStartTour(tour, stepNum); }, 5);
        }
        else {
            if (stepNum !== undefined && tour !== undefined) {
                hopscotch.startTour(tour, stepNum);
            }
            else if (stepNum === undefined && tour === undefined) {
                hopscotch.startTour(this.getTour());
            }
            else if (stepNum !== undefined && tour === undefined) {
                hopscotch.startTour(this.getTour(), stepNum);
            }
            else if (stepNum === undefined && tour !== undefined) {
                hopscotch.startTour(tour);
            }
            ;
        }
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    showStep(idx) {
        hopscotch.showStep(idx); //Skips to a given step in the tour
    }
    /**
     * @return {?}
     */
    prevStep() {
        hopscotch.prevStep(); //Goes back one step in the touropscotch.nextStep(); //Goes forward one step in the tour
    }
    /**
     * @param {?=} clearCookie
     * @return {?}
     */
    endTour(clearCookie) {
        hopscotch.endTour(clearCookie === undefined ? false : clearCookie); //Ends the current tour. If clearCookie is set to false, the tour state is preserved. Otherwise, if clearCookie is set to true or is not provided, the tour state is cleared.
    }
    /**
     * @param {?} options
     * @return {?}
     */
    configure(options) {
        hopscotch.configure(options); //Sets options for running the tour. See above section "Setting tour options" for a list of configuration options.
    }
    /**
     * @return {?}
     */
    getCurrTour() {
        return hopscotch.getCurrTour(); //Returns the currently running tour.
    }
    /**
     * @return {?}
     */
    getCurrStepNum() {
        return parseInt(hopscotch.getCurrStepNum()); //Returns the current zero-based step number.
    }
    /**
     * @return {?}
     */
    getState() {
        const /** @type {?} */ state = hopscotch.getState();
        if (!state) {
            return undefined;
        }
        const /** @type {?} */ splitted = state.split(':');
        if (splitted.length < 2) {
            return undefined;
        }
        return new HopscotchState(splitted[0], parseInt(splitted[1])); //Checks for tour state saved in sessionStorage/cookies and returns the state if it exists. Use this method to determine whether or not you should resume a tour.
    }
    /**
     * @param {?} event
     * @return {?}
     */
    listen(event) {
        return new Observable(observer => {
            // Adds a callback for one of the event types.
            // Valid event types are:
            // *start*, *end*, *next*, *prev*, *show*, *close*, *error*
            hopscotch.listen(event, data => {
                observer.next(data);
            });
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    unlisten(event) {
        return new Observable(observer => {
            hopscotch.unlisten(event, data => {
                observer.next(data);
            }); //Removes a callback for one of the event types.
        });
    }
    /**
     * @param {?=} eventName
     * @param {?=} tourOnly
     * @return {?}
     */
    removeCallbacks(eventName, tourOnly) {
        // Remove callbacks for hopscotch events. If tourOnly is set to true,
        // only removes callbacks specified by a tour (callbacks set by
        // hopscotch.configure or hopscotch.listen will remain).
        // If eventName is null or undefined, callbacks for all events will be removed.
        if (eventName === undefined && tourOnly === undefined) {
            hopscotch.removeCallbacks();
        }
        else if (eventName !== undefined && tourOnly !== undefined) {
            hopscotch.removeCallbacks(eventName, tourOnly);
        }
        else if (eventName === undefined || tourOnly !== undefined) {
            hopscotch.removeCallbacks(tourOnly);
        }
        else if (eventName !== undefined || tourOnly === undefined) {
            hopscotch.removeCallbacks(eventName);
        }
    }
    /**
     * @param {?} id
     * @param {?} helperFn
     * @return {?}
     */
    registerHelper(id, helperFn) {
        hopscotch.registerHelper(id, helperFn);
    }
    /**
     * @return {?}
     */
    resetDefaultI18N() {
        hopscotch.resetDefaultI18N(); //Resets i18n strings to original default values.
    }
    /**
     * @return {?}
     */
    resetDefaultOptions() {
        hopscotch.resetDefaultOptions(); //Resets all config options to original values.
    }
}
SamHopsctochConfigsService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SamHopsctochConfigsService.ctorParameters = () => [
    { type: LibEventsService, },
];
function SamHopsctochConfigsService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SamHopsctochConfigsService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SamHopsctochConfigsService.ctorParameters;
    /** @type {?} */
    SamHopsctochConfigsService.prototype.tour;
    /** @type {?} */
    SamHopsctochConfigsService.prototype.directiveCreatedSteps;
    /** @type {?} */
    SamHopsctochConfigsService.prototype.directiveInitializedSteps;
    /** @type {?} */
    SamHopsctochConfigsService.prototype.libEventsService;
}
//# sourceMappingURL=sam-hopsctoch-configs.service.js.map