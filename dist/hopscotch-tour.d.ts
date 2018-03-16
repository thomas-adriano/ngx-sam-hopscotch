import { HopscotchStep } from "./hopscotch-step";
export declare class HopscotchTour {
    static readonly DEFAULT_ID: string;
    private id;
    private steps;
    constructor(id?: string);
    setId(id: string): void;
    addStep(step: HopscotchStep): void;
    getSteps(): Array<HopscotchStep>;
}
