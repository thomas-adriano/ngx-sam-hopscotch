import { ElementRef, OnInit, OnChanges } from "@angular/core";
import { SamHopsctochConfigsService } from "./sam-hopsctoch-configs.service";
import { HopscotchStep } from "./hopscotch-step";
import { LibEventsService } from "./lib-events.service";
export declare class SamHopscotchStepDirective implements OnInit, OnChanges {
    private el;
    private hopsctochConfigs;
    private libEventsService;
    step: HopscotchStep;
    constructor(el: ElementRef, hopsctochConfigs: SamHopsctochConfigsService, libEventsService: LibEventsService);
    ngOnInit(): void;
    ngOnChanges(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    private highlight(color);
}
