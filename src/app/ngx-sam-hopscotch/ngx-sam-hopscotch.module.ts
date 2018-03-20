import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SamHopscotchStepDirective } from "./sam-hopscotch-step.directive";
import { SamHopsctochConfigsService } from "./sam-hopsctoch-configs.service";
import { LibEventsService } from "./lib-events.service";
import '../hopscotch.css';

@NgModule({
  imports: [CommonModule],
  declarations: [SamHopscotchStepDirective],
  exports: [SamHopscotchStepDirective]
})
export class NgxSamHopscotchModule {
  public static forRoot(): ModuleWithProviders {
    return { ngModule: NgxSamHopscotchModule, providers: [SamHopsctochConfigsService, LibEventsService] };
  }
}
export { HopscotchStep } from "./hopscotch-step";
export { HopscotchTour } from "./hopscotch-tour";
export { SamHopsctochConfigsService } from "./sam-hopsctoch-configs.service";
