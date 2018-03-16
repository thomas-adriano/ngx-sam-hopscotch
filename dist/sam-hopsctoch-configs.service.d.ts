import { HopscotchStep } from "./hopscotch-step";
import { HopscotchTour } from "./hopscotch-tour";
import 'hopscotch';
export declare class SamHopsctochConfigsService {
    private tour;
    constructor();
    addStep(step: HopscotchStep): SamHopsctochConfigsService;
    getTour(): HopscotchTour;
    startTour(): void;
}
