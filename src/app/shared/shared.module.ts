import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SamHopscotchStepDirective } from './sam-hopscotch-step/sam-hopscotch-step.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [SamHopscotchStepDirective],
  exports: [SamHopscotchStepDirective]
})
export class SharedModule {}
