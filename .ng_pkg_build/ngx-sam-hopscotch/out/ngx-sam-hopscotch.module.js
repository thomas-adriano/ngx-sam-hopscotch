/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SamHopscotchStepDirective } from "./sam-hopscotch-step.directive";
import { SamHopsctochConfigsService } from "./sam-hopsctoch-configs.service";
import { LibEventsService } from "./lib-events.service";
import '../hopscotch.css';
export class NgxSamHopscotchModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return { ngModule: NgxSamHopscotchModule, providers: [SamHopsctochConfigsService, LibEventsService] };
    }
}
NgxSamHopscotchModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [SamHopscotchStepDirective],
                exports: [SamHopscotchStepDirective]
            },] },
];
/** @nocollapse */
NgxSamHopscotchModule.ctorParameters = () => [];
function NgxSamHopscotchModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    NgxSamHopscotchModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    NgxSamHopscotchModule.ctorParameters;
}
export { HopscotchStep } from "./hopscotch-step";
export { HopscotchTour } from "./hopscotch-tour";
export { SamHopsctochConfigsService } from "./sam-hopsctoch-configs.service";
//# sourceMappingURL=ngx-sam-hopscotch.module.js.map