import {
  Directive,
  HostListener,
  ElementRef,
  Input,
  OnChanges
} from '@angular/core';
import { HopsctochWrapperService } from '../../core/hopscotch-wrapper/hopscotch-wrapper.service';
import { HopscotchStep } from '../../core/model/hopscotch-step';

@Directive({
  selector: '[samHopscotchStep]'
})
export class SamHopscotchStepDirective implements OnChanges {
  @Input('samHopscotchStep') public step: HopscotchStep;
  private stepAdded = false;

  constructor(
    private el: ElementRef,
    private hopsctochWrapperService: HopsctochWrapperService
  ) {}

  ngOnChanges() {
    if (!this.step || this.stepAdded) {
      return;
    }

    if (!this.step.target) {
      this.step.target = this.el.nativeElement;
    }

    this.hopsctochWrapperService.addStep(this.step);
    this.stepAdded = true;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.highlight('red');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
