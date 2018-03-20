import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class LibEventsService {

  private hopscotchStartedEvent = new EventEmitter<any>();
  private hopscotchStepCreatedEvent = new EventEmitter<any>();
  private hopscotchStepInitializedEvent = new EventEmitter<any>();

  constructor() { }

  public hopscotchStarted(): EventEmitter<any> {
    return this.hopscotchStartedEvent;
  }

  public hopscotchStepCreated(): EventEmitter<any> {
    return this.hopscotchStepCreatedEvent;
  }

  public hopscotchStepInitialized(): EventEmitter<any> {
    return this.hopscotchStepInitializedEvent;
  }

}
