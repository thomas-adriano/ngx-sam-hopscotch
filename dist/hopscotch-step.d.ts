export declare class HopscotchStep {
    title: string;
    content: string;
    target: Element | string;
    placement: "top" | "bottom" | "right" | "left";
    constructor();
    setTitle(title: string): HopscotchStep;
    setContent(content: string): HopscotchStep;
    setTarget(target: Element | string): HopscotchStep;
    setPlacement(targetplacement: "top" | "bottom" | "right" | "left"): HopscotchStep;
}
