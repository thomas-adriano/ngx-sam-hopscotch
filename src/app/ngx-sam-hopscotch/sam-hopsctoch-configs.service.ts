import { Injectable } from "@angular/core";
import { HopscotchStep } from "./hopscotch-step";
import { HopscotchTour } from "./hopscotch-tour";
import hopscotch from "hopscotch";

@Injectable()
export class SamHopsctochConfigsService {
  private tour = new HopscotchTour();

  constructor() {}

  public addStep(step: HopscotchStep): SamHopsctochConfigsService {
    this.tour.addStep(step);
    console.log("all steps: ", this.tour);
    return this;
  }

  public getTour(): HopscotchTour {
    return this.tour;
  }

  public startTour() {
    setTimeout(() => {
      hopscotch.startTour(this.tour);
    });
  }
}
