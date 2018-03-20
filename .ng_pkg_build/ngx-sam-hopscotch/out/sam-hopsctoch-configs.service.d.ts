import { HopscotchStep } from "./hopscotch-step";
import { HopscotchTour } from "./hopscotch-tour";
import { HopscotchConfigOption } from "./hopscotch-config-option";
import { Observable } from 'rxjs/Observable';
import { HopscotchState } from "./hopscotch-state";
import { LibEventsService } from "./lib-events.service";
/**
 * http://linkedin.github.io/hopscotch/#all-step-options
*/
export declare class SamHopsctochConfigsService {
    libEventsService: LibEventsService;
    private tour;
    private directiveCreatedSteps;
    private directiveInitializedSteps;
    constructor(libEventsService: LibEventsService);
    addStep(step: HopscotchStep): void;
    setTour(tour: HopscotchTour): void;
    getTour(): HopscotchTour;
    startTour(tour?: HopscotchTour, stepNum?: number): void;
    private doStartTour(tour?, stepNum?);
    showStep(idx: number): void;
    prevStep(): void;
    endTour(clearCookie?: boolean): void;
    configure(options: HopscotchConfigOption): void;
    getCurrTour(): string;
    getCurrStepNum(): number;
    getState(): HopscotchState;
    listen(event: 'start' | 'end' | 'next' | 'prev' | 'show' | 'close' | 'error'): Observable<any>;
    unlisten(event: 'start' | 'end' | 'next' | 'prev' | 'show' | 'close' | 'error'): Observable<any>;
    removeCallbacks(eventName?: 'start' | 'end' | 'next' | 'prev' | 'show' | 'close' | 'error', tourOnly?: boolean): void;
    registerHelper(id: string, helperFn: Function): void;
    resetDefaultI18N(): void;
    resetDefaultOptions(): void;
}
