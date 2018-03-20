import { EventEmitter } from '@angular/core';
export declare class LibEventsService {
    private hopscotchStartedEvent;
    private hopscotchStepCreatedEvent;
    private hopscotchStepInitializedEvent;
    constructor();
    hopscotchStarted(): EventEmitter<any>;
    hopscotchStepCreated(): EventEmitter<any>;
    hopscotchStepInitialized(): EventEmitter<any>;
}
