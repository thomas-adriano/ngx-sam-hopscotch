export declare class HopscotchStep {
    placement: "top" | "bottom" | "right" | "left";
    title: string;
    content: string;
    width: number;
    padding: number;
    xOffset: number | 'center';
    yOffset: number | 'center';
    arrowOffset: number | 'center';
    delay: number;
    zindex: number;
    showNextButton: boolean;
    showPrevButton: boolean;
    showCTAButton: boolean;
    ctaLabel: string;
    multipage: boolean;
    showSkip: boolean;
    fixedElement: boolean;
    nextOnTargetClick: boolean;
    onPrev: Function;
    onNext: Function;
    onShow: Function;
    onCTA: Function;
    target: Element | string;
    stepNumber: number;
    constructor(placement?: "top" | "bottom" | "right" | "left");
}
