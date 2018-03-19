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

@Directive({
  selector: "[samHopscotchStep]"
})
export class SamHopscotchStepDirective implements OnInit, OnChanges {
  @Input('samHopscotchStep') public step: HopscotchStep;

  constructor(
    private el: ElementRef,
    private hopsctochConfigs: SamHopsctochConfigsService
  ) {}

  ngOnInit() {}

  ngOnChanges() {
    if (!this.step) {
      return;
    }
    if (!this.step.target) {
      this.step.target = this.el.nativeElement;
    }
    console.log(this.step);
    const a = this.hopsctochConfigs.addStep(this.step);
  }

  // const tour = {
  //   id: "hello-hopscotch",
  //   steps: [
  //     {
  //       title: "My Header",
  //       content: "This is the header of my page.",
  //       target: "header",
  //       placement: "right"
  //     },
  //     {
  //       title: "My content",
  //       content: "Here is where I put my content.",
  //       target: document.querySelector("#content p"),
  //       placement: "bottom"
  //     }
  //   ]
  // };

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
