import { HopscotchStep } from "./hopscotch-step";

export class HopscotchTour {
  public static readonly DEFAULT_ID = "ngx-sam-hopscotch-tour-id";
  public id = HopscotchTour.DEFAULT_ID;
  public steps = new Array<HopscotchStep>();

  constructor(id?: string) {
    if (id) {
      this.id = id;
    }
  }

  public setId(id: string) {
    this.id = id;
  }

  public addStep(step: HopscotchStep) {
    if (!step) {
      return;
    }
    this.steps.push(Object.assign(new HopscotchStep(), step));
  }

  public getSteps(): Array<HopscotchStep> {
    return this.steps.map(e => Object.assign(new HopscotchStep(), e));
  }
}
