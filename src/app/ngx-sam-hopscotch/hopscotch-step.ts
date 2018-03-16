export class HopscotchStep {
  private _title: string;
  private _content: string;
  private _target: Element | string;
  private _targetplacement: "top" | "bottom" | "right" | "left";

  constructor() {}

  title(title: string): HopscotchStep {
    this._title = title;
    return this;
  }

  content(content: string): HopscotchStep {
    this._content = content;
    return this;
  }

  target(target: Element | string): HopscotchStep {
    this._target = target;
    return this;
  }

  targetplacement(
    targetplacement: "top" | "bottom" | "right" | "left"
  ): HopscotchStep {
    this._targetplacement = targetplacement;
    return this;
  }
}
