import { Injectable } from "@angular/core";
import { HopscotchStep } from "./hopscotch-step";
import { HopscotchTour } from "./hopscotch-tour";

declare const hopscotch;
@Injectable()
export class SamHopsctochConfigsService {
  private tour = new HopscotchTour();

  constructor() {}

  public addStep(step: HopscotchStep): SamHopsctochConfigsService {
    this.tour.addStep(step);
    return this;
  }

  public getTour(): HopscotchTour {
    return this.tour;
  }

  public startTour() {
    hopscotch.startTour(this.tour);
  }
}
