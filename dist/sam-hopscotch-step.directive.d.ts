import { ElementRef, OnInit } from "@angular/core";
import { SamHopsctochConfigsService } from "./sam-hopsctoch-configs.service";
export declare class SamHopscotchStepDirective implements OnInit {
    private el;
    private hopsctochConfigs;
    constructor(el: ElementRef, hopsctochConfigs: SamHopsctochConfigsService);
    ngOnInit(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    private highlight(color);
    private initHopscotchTour();
}
