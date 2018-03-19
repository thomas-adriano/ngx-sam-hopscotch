import { Injectable, Directive, HostListener, ElementRef, Input, NgModule } from '@angular/core';
import hopscotch from 'hopscotch';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HopscotchStep {
    constructor() {
        this.placement = "bottom";
    }
    /**
     * @param {?} title
     * @return {?}
     */
    setTitle(title) {
        this.title = title;
        return this;
    }
    /**
     * @param {?} content
     * @return {?}
     */
    setContent(content) {
        this.content = content;
        return this;
    }
    /**
     * @param {?} target
     * @return {?}
     */
    setTarget(target) {
        this.target = target;
        return this;
    }
    /**
     * @param {?} targetplacement
     * @return {?}
     */
    setPlacement(targetplacement) {
        this.placement = targetplacement;
        return this;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HopscotchTour {
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
        this.steps.push(Object.assign(new HopscotchStep(), step));
    }
    /**
     * @return {?}
     */
    getSteps() {
        return this.steps.map(e => Object.assign(new HopscotchStep(), e));
    }
}
HopscotchTour.DEFAULT_ID = "ngx-sam-hopscotch-tour-id";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SamHopsctochConfigsService {
    constructor() {
        this.tour = new HopscotchTour();
    }
    /**
     * @param {?} step
     * @return {?}
     */
    addStep(step) {
        this.tour.addStep(step);
        console.log("all steps: ", this.tour);
        return this;
    }
    /**
     * @return {?}
     */
    getTour() {
        return this.tour;
    }
    /**
     * @return {?}
     */
    startTour() {
        setTimeout(() => {
            hopscotch.startTour(this.tour);
        });
    }
}
SamHopsctochConfigsService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SamHopsctochConfigsService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SamHopscotchStepDirective {
    /**
     * @param {?} el
     * @param {?} hopsctochConfigs
     */
    constructor(el, hopsctochConfigs) {
        this.el = el;
        this.hopsctochConfigs = hopsctochConfigs;
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * @return {?}
     */
    ngOnChanges() {
        if (!this.step) {
            return;
        }
        if (!this.step.target) {
            this.step.target = this.el.nativeElement;
        }
        console.log(this.step);
        const /** @type {?} */ a = this.hopsctochConfigs.addStep(this.step);
    }
    /**
     * @return {?}
     */
    onMouseEnter() {
        this.highlight("red");
    }
    /**
     * @return {?}
     */
    onMouseLeave() {
        this.highlight(null);
    }
    /**
     * @param {?} color
     * @return {?}
     */
    highlight(color) {
        this.el.nativeElement.style.backgroundColor = color;
    }
}
SamHopscotchStepDirective.decorators = [
    { type: Directive, args: [{
                selector: "[samHopscotchStep]"
            },] },
];
/** @nocollapse */
SamHopscotchStepDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: SamHopsctochConfigsService, },
];
SamHopscotchStepDirective.propDecorators = {
    "step": [{ type: Input, args: ['samHopscotchStep',] },],
    "onMouseEnter": [{ type: HostListener, args: ["mouseenter",] },],
    "onMouseLeave": [{ type: HostListener, args: ["mouseleave",] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgxSamHopscotchModule {
}
NgxSamHopscotchModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                providers: [SamHopsctochConfigsService],
                declarations: [SamHopscotchStepDirective],
                exports: [SamHopscotchStepDirective]
            },] },
];
/** @nocollapse */
NgxSamHopscotchModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { NgxSamHopscotchModule, HopscotchStep, HopscotchTour, SamHopsctochConfigsService, SamHopscotchStepDirective as ɵa };
//# sourceMappingURL=ngx-sam-hopscotch.js.map
