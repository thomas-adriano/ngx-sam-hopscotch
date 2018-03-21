import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { HopsctochWrapperService } from '../../core/hopscotch-wrapper/hopscotch-wrapper.service';
import { HopscotchStep } from '../../core/model/hopscotch-step';

/**
 * Cada elemento que possuir esta diretiva será o alvo de um passo do tour
 */
@Directive({
  selector: '[samHopscotchStep]'
})
export class SamHopscotchStepDirective implements OnChanges {
  // Objecto HopscotchStep ou numero do step
  @Input('samHopscotchStep') public step: HopscotchStep | string;
  private stepAdded = false;

  constructor(
    private el: ElementRef,
    private hopsctochWrapperService: HopsctochWrapperService
  ) {}

  ngOnChanges() {
    if (this.step === undefined || this.stepAdded) {
      return;
    }

    if (this.step instanceof HopscotchStep) {
      // caso o step seja um HopscotchStep, o objeto de tour foi
      // implicitamente criado ao chamar startTour().
      if (!this.step.target) {
        this.step.target = this.el.nativeElement;
      }

      this.hopsctochWrapperService.addStep(this.step);
    } else if (typeof this.step === 'string') {
      try {
        const stepNumber = parseInt(this.step, 10);

        // caso o step seja um numero, um objeto de tour foi
        // informado explicitamente ao chamar o startTour().

        // seta o elemento no qual esta diretiva foi informada
        // como target deste passo do tour existente
        this.hopsctochWrapperService.tour.steps
          .filter(s => s.stepNumber === stepNumber)
          .forEach(s => (s.target = this.el.nativeElement));
      } catch (e) {
        throw Error('O step deve ser ou um inteiro ou do tipo HopscotchStep');
      }
    }

    this.stepAdded = true;
  }
}
