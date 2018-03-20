import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { HopsctochWrapperService } from './core/hopscotch-wrapper/hopscotch-wrapper.service';

@NgModule({
  imports: [SharedModule],
  exports: [SharedModule]
})
export class NgxSamHopscotchModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxSamHopscotchModule,
      providers: [HopsctochWrapperService]
    };
  }
}
