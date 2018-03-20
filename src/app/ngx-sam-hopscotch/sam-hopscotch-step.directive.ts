import {
  Directive,
  HostListener,
  ElementRef,
  OnInit,
  Input,
  OnChanges
} from "@angular/core";
import { SamHopsctochConfigsService } from "./sam-hopsctoch-configs.service";
import { HopscotchStep } from "./hopscotch-step";
import { LibEventsService } from "./lib-events.service";

@Directive({
  selector: "[samHopscotchStep]"
})
export class SamHopscotchStepDirective implements OnInit, OnChanges {
  @Input('samHopscotchStep') public step: HopscotchStep;

  constructor(
    private el: ElementRef,
    private hopsctochConfigs: SamHopsctochConfigsService,
    private libEventsService: LibEventsService
  ) {
    this.libEventsService.hopscotchStepCreated().emit();
  }

  ngOnInit() {
    this.libEventsService.hopscotchStarted().subscribe(() => {
      this.hopsctochConfigs.addStep(this.step);
      this.libEventsService.hopscotchStepInitialized().emit();
      console.log(this.hopsctochConfigs.getTour());
    });
  }

  ngOnChanges() {
    if (!this.step) {
      return;
    }
    if (!this.step.target) {
      this.step.target = this.el.nativeElement;
    }
  }

  @HostListener("mouseenter")
  onMouseEnter() {
    this.highlight("red");
  }

  @HostListener("mouseleave")
  onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
