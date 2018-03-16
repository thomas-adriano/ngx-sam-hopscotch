export declare class HopscotchStep {
    private _title;
    private _content;
    private _target;
    private _targetplacement;
    constructor();
    title(title: string): HopscotchStep;
    content(content: string): HopscotchStep;
    target(target: Element | string): HopscotchStep;
    targetplacement(targetplacement: "top" | "bottom" | "right" | "left"): HopscotchStep;
}
