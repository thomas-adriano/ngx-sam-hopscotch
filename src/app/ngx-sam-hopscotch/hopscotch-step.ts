export class HopscotchStep {
  public title: string;
  public content: string;
  public target: Element | string;
  public placement: "top" | "bottom" | "right" | "left" = "bottom";

  constructor() {}

  setTitle(title: string): HopscotchStep {
    this.title = title;
    return this;
  }

  setContent(content: string): HopscotchStep {
    this.content = content;
    return this;
  }

  setTarget(target: Element | string): HopscotchStep {
    this.target = target;
    return this;
  }

  setPlacement(
    targetplacement: "top" | "bottom" | "right" | "left"
  ): HopscotchStep {
    this.placement = targetplacement;
    return this;
  }
}
