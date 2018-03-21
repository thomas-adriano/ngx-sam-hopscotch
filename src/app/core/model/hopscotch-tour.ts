import { HopscotchStep } from './hopscotch-step';

export class HopscotchTour {
  public static readonly DEFAULT_ID = 'ngx-sam-hopscotch-tour-id-' +
    HopscotchTour.getRandom(0, 999999);
  private _id = HopscotchTour.DEFAULT_ID;
  private _steps = new Array<HopscotchStep>();

  constructor(id?: string) {
    if (id) {
      this.id = id;
    }
  }

  private static getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  public set id(id: string) {
    this._id = id;
  }

  public get id() {
    return this._id;
  }

  public addStep(step: HopscotchStep) {
    if (!step) {
      return;
    }
    this._steps.push(step);
    this._steps = this._steps.sort((a, b) => a.stepNumber - b.stepNumber);
  }

  public get steps(): Array<HopscotchStep> {
    return this._steps;
  }
}
