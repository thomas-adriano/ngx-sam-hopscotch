/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, HostListener, ElementRef, Input } from "@angular/core";
import { SamHopsctochConfigsService } from "./sam-hopsctoch-configs.service";
import { HopscotchStep } from "./hopscotch-step";
import { LibEventsService } from "./lib-events.service";
export class SamHopscotchStepDirective {
    /**
     * @param {?} el
     * @param {?} hopsctochConfigs
     * @param {?} libEventsService
     */
    constructor(el, hopsctochConfigs, libEventsService) {
        this.el = el;
        this.hopsctochConfigs = hopsctochConfigs;
        this.libEventsService = libEventsService;
        this.libEventsService.hopscotchStepCreated().emit();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.libEventsService.hopscotchStarted().subscribe(() => {
            this.hopsctochConfigs.addStep(this.step);
            this.libEventsService.hopscotchStepInitialized().emit();
            console.log(this.hopsctochConfigs.getTour());
        });
    }
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
    { type: LibEventsService, },
];
SamHopscotchStepDirective.propDecorators = {
    "step": [{ type: Input, args: ['samHopscotchStep',] },],
    "onMouseEnter": [{ type: HostListener, args: ["mouseenter",] },],
    "onMouseLeave": [{ type: HostListener, args: ["mouseleave",] },],
};
function SamHopscotchStepDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SamHopscotchStepDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SamHopscotchStepDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    SamHopscotchStepDirective.propDecorators;
    /** @type {?} */
    SamHopscotchStepDirective.prototype.step;
    /** @type {?} */
    SamHopscotchStepDirective.prototype.el;
    /** @type {?} */
    SamHopscotchStepDirective.prototype.hopsctochConfigs;
    /** @type {?} */
    SamHopscotchStepDirective.prototype.libEventsService;
}
//# sourceMappingURL=sam-hopscotch-step.directive.js.map