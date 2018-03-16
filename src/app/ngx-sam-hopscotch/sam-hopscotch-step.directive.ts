import { Directive, HostListener, ElementRef, OnInit } from "@angular/core";
import { SamHopsctochConfigsService } from "./sam-hopsctoch-configs.service";
import { HopscotchStep } from "./hopscotch-step";

@Directive({
  selector: "[samHopscotchStep]"
})
export class SamHopscotchStepDirective implements OnInit {
  constructor(
    private el: ElementRef,
    private hopsctochConfigs: SamHopsctochConfigsService
  ) {}

  ngOnInit() {
    this.initHopscotchTour();
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

  private initHopscotchTour() {
    const a = this.hopsctochConfigs.addStep(
      new HopscotchStep()
        .title("My Header")
        .content("This is the header of my page")
        .target(this.el.nativeElement)
        .targetplacement("right")
    );

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
  }
}
