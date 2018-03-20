export class HopscotchStep {
  public title: string;
  public content: string;
  public width: number;
  public padding: number;
  public xOffset: number | 'center';
  public yOffset: number | 'center';
  public arrowOffset: number | 'center';
  public delay: number;
  public zindex: number;
  public showNextButton: boolean;
  public showPrevButton: boolean;
  public showCTAButton: boolean;
  public ctaLabel: string;
  public multipage: boolean;
  public showSkip: boolean;
  public fixedElement: boolean;
  public nextOnTargetClick: boolean;
  public onPrev: Function;
  public onNext: Function;
  public onShow: Function;
  public onCTA: Function;
  public target: Element | string;
  public stepNumber = 0;

  constructor(public placement: "top" | "bottom" | "right" | "left" = "bottom") { }
}
