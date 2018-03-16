import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SamHopscotchStepDirective } from "./sam-hopscotch-step.directive";
import { SamHopsctochConfigsService } from "./sam-hopsctoch-configs.service";

@NgModule({
  imports: [CommonModule],
  providers: [SamHopsctochConfigsService],
  declarations: [SamHopscotchStepDirective],
  exports: [SamHopscotchStepDirective]
})
export class NgxSamHopscotchModule {}
export { HopscotchStep } from "./hopscotch-step";
export { HopscotchTour } from "./hopscotch-tour";
export { SamHopsctochConfigsService } from "./sam-hopsctoch-configs.service";
