import { ElementRef, OnInit, OnChanges } from "@angular/core";
import { SamHopsctochConfigsService } from "./sam-hopsctoch-configs.service";
import { HopscotchStep } from "./hopscotch-step";
export declare class SamHopscotchStepDirective implements OnInit, OnChanges {
    private el;
    private hopsctochConfigs;
    step: HopscotchStep;
    constructor(el: ElementRef, hopsctochConfigs: SamHopsctochConfigsService);
    ngOnInit(): void;
    ngOnChanges(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    private highlight(color);
}
