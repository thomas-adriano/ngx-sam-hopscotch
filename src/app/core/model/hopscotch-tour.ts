import { HopscotchStep } from './hopscotch-step';

export class HopscotchTour {
  public static readonly DEFAULT_ID = 'ngx-sam-hopscotch-tour-id-' +
    HopscotchTour.getRandom(0, 999999);
  public id = HopscotchTour.DEFAULT_ID;
  private steps = new Array<HopscotchStep>();

  constructor(id?: string) {
    if (id) {
      this.id = id;
    }
  }

  private static getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  public setId(id: string) {
    this.id = id;
  }

  public addStep(step: HopscotchStep) {
    if (!step) {
      return;
    }
    this.steps.push(Object.assign(new HopscotchStep(step.placement), step));
  }

  public getSteps(): Array<HopscotchStep> {
    return this.steps
      .map(e => Object.assign(new HopscotchStep(e.placement), e))
      .sort((a, b) => a.stepNumber - b.stepNumber);
  }
}
