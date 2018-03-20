/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { HopscotchStep } from "./hopscotch-step";
export class HopscotchTour {
    /**
     * @param {?=} id
     */
    constructor(id) {
        this.id = HopscotchTour.DEFAULT_ID;
        this.steps = new Array();
        if (id) {
            this.id = id;
        }
    }
    /**
     * @param {?} id
     * @return {?}
     */
    setId(id) {
        this.id = id;
    }
    /**
     * @param {?} step
     * @return {?}
     */
    addStep(step) {
        if (!step) {
            return;
        }
        this.steps.push(Object.assign(new HopscotchStep(step.placement), step));
    }
    /**
     * @return {?}
     */
    getSteps() {
        return this.steps.map(e => Object.assign(new HopscotchStep(e.placement), e));
    }
    /**
     * @param {?} min
     * @param {?} max
     * @return {?}
     */
    static getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}
HopscotchTour.DEFAULT_ID = "ngx-sam-hopscotch-tour-id-" + HopscotchTour.getRandom(0, 999999);
function HopscotchTour_tsickle_Closure_declarations() {
    /** @type {?} */
    HopscotchTour.DEFAULT_ID;
    /** @type {?} */
    HopscotchTour.prototype.id;
    /** @type {?} */
    HopscotchTour.prototype.steps;
}
//# sourceMappingURL=hopscotch-tour.js.map