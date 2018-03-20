import { HopscotchStep } from "./hopscotch-step";
export declare class HopscotchTour {
    static readonly DEFAULT_ID: string;
    id: string;
    steps: HopscotchStep[];
    constructor(id?: string);
    setId(id: string): void;
    addStep(step: HopscotchStep): void;
    getSteps(): Array<HopscotchStep>;
    private static getRandom(min, max);
}
