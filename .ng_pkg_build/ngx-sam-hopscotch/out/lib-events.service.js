/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, EventEmitter } from '@angular/core';
export class LibEventsService {
    constructor() {
        this.hopscotchStartedEvent = new EventEmitter();
        this.hopscotchStepCreatedEvent = new EventEmitter();
        this.hopscotchStepInitializedEvent = new EventEmitter();
    }
    /**
     * @return {?}
     */
    hopscotchStarted() {
        return this.hopscotchStartedEvent;
    }
    /**
     * @return {?}
     */
    hopscotchStepCreated() {
        return this.hopscotchStepCreatedEvent;
    }
    /**
     * @return {?}
     */
    hopscotchStepInitialized() {
        return this.hopscotchStepInitializedEvent;
    }
}
LibEventsService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
LibEventsService.ctorParameters = () => [];
function LibEventsService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    LibEventsService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    LibEventsService.ctorParameters;
    /** @type {?} */
    LibEventsService.prototype.hopscotchStartedEvent;
    /** @type {?} */
    LibEventsService.prototype.hopscotchStepCreatedEvent;
    /** @type {?} */
    LibEventsService.prototype.hopscotchStepInitializedEvent;
}
//# sourceMappingURL=lib-events.service.js.map