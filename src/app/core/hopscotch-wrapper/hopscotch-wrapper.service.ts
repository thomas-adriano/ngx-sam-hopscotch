import { Injectable } from '@angular/core';
import hopscotch from 'hopscotch';
import { Observable } from 'rxjs/Observable';
import { HopscotchConfigOptions } from '../model/hopscotch-config-options';
import { HopscotchStep } from '../model/hopscotch-step';
import { HopscotchTour } from '../model/hopscotch-tour';
import { HopscotchState } from '../model/hopscotch-state';
import { OptimizedResizeListenerService } from '../optimized-resize-listener/optimized-resize-listener.service';
import { Subscription } from 'rxjs/Subscription';

/**
 * Para mais informações sobre configs/API do hopscotch: http://linkedin.github.io/hopscotch/#all-step-options
 * Este serviço é um wrapper do objeto global 'hopscotch'. Todos os metodos da API oficial são expostas;
 */
@Injectable()
export class HopsctochWrapperService {
  private _tour: HopscotchTour;
  private options: HopscotchConfigOptions;
  private optimizedResizeSubscription: Subscription;

  constructor(
    public optimizedResizeListenerService: OptimizedResizeListenerService
  ) {}

  /**
   * Adiciona um step ao tour ativo
   * @param step step a ser adicionado no tour atual
   */
  public addStep(step: HopscotchStep) {
    this.tour.addStep(step);
  }

  public set tour(tour: HopscotchTour) {
    this._tour = tour;
  }

  public get tour(): HopscotchTour {
    if (!this._tour) {
      this._tour = new HopscotchTour();
    }
    return this._tour;
  }

  /**
   * Inicia o tour
   * @param stepNum step (base 1) no qual o tour será iniciado
   */
  public startTour(stepNum?: number) {
    if (this.options && this.options.fadeBackground) {
      this.initFadeBackground();
    }

    this.doStartTour(stepNum);
  }

  private initFadeBackground() {
    const overlayCanvasId = 'ngx-sam-hopscotch-bg-canvas';
    let overlayCanvasEl: HTMLCanvasElement;
    let targetStepEl;

    this.listen('show').subscribe(data => {
      const currStep = this.tour.steps[this.getCurrStepNum()];
      targetStepEl = currStep.target;
      if (typeof targetStepEl === 'string') {
        try {
          targetStepEl = document.getElementById(targetStepEl) as HTMLElement;
        } catch (e) {
          // não é um HTMLElement válido, pula
        }
      }

      if (targetStepEl instanceof HTMLElement) {
        const devicePixelRatio = window.devicePixelRatio || 1;

        const prevCanvas = document.getElementById(
          overlayCanvasId
        ) as HTMLCanvasElement;

        if (prevCanvas) {
          // se o canvas ja existir na dom, basta atualizar seu conteudo
          this.updateCanvas(overlayCanvasEl, targetStepEl);
        } else {
          // se o canvas ainda nao existir na dom, cria e insere
          overlayCanvasEl = document.createElement('canvas');

          overlayCanvasEl.id = overlayCanvasId;
          overlayCanvasEl.style.cssText = `
            position: fixed;
            width: 100vw;
            height: 100vh;
            bottom: 0;
            left: 0;
            z-index: 1000;
            opacity: ${this.options.fadeBackgroundColorAlpha};
          `;
          this.updateCanvas(overlayCanvasEl, targetStepEl);

          document.body.appendChild(overlayCanvasEl);
        }
      }
    });

    this.listen('close').subscribe(data => {
      this.unsubscribeFromOptimizedResize();
      if (document.getElementById(overlayCanvasId)) {
        document.body.removeChild(overlayCanvasEl);
      }
    });
    this.listen('error').subscribe(data => {
      this.unsubscribeFromOptimizedResize();
      if (document.getElementById(overlayCanvasId)) {
        document.body.removeChild(overlayCanvasEl);
      }
    });
    this.listen('end').subscribe(data => {
      this.unsubscribeFromOptimizedResize();
      if (document.getElementById(overlayCanvasId)) {
        document.body.removeChild(overlayCanvasEl);
      }
    });

    this.optimizedResizeSubscription = this.optimizedResizeListenerService
      .onOptimizedResize()
      .subscribe(() => {
        if (!overlayCanvasEl || !targetStepEl) {
          return;
        }
        // atualiza o canvas quando um evento de resize ocorrer
        this.updateCanvas(overlayCanvasEl, targetStepEl);
      });
  }

  private unsubscribeFromOptimizedResize() {
    if (this.optimizedResizeSubscription) {
      this.optimizedResizeSubscription.unsubscribe();
    }
  }

  private doStartTour(stepNum?: number) {
    // necessario por a chamada de startTour no onload, mais infos:
    // https://github.com/linkedin/hopscotch/issues/321
    window.onload = () => {
      if (stepNum !== undefined) {
        // este wrapper utiliza base 1 para denotar ordem de steps
        // o hopscotch utiliza base 0...
        stepNum--;
        hopscotch.startTour(this.tour, stepNum);
      } else {
        hopscotch.startTour(this.tour);
      }
    };
  }

  /**
   * Atualiza o canvas para refletir o step atual
   * @param overlayCanvasEl elemento canvas
   * @param targetStepEl elemento HTML que será focado
   */
  private updateCanvas(
    overlayCanvasEl: HTMLCanvasElement,
    targetStepEl: HTMLElement
  ) {
    const targetElBoundingClientRect = targetStepEl.getBoundingClientRect();
    const overlayCanvasCtx = overlayCanvasEl.getContext('2d');

    // configura o canvas para que ocupe todo o viewport
    // e se comporte corretamente independente do DPI do monitor
    overlayCanvasEl.width = window.innerWidth * devicePixelRatio;
    overlayCanvasEl.height = window.innerHeight * devicePixelRatio;
    overlayCanvasCtx.scale(devicePixelRatio, devicePixelRatio);

    // apaga conteúdo atual do canvas
    overlayCanvasCtx.clearRect(
      0,
      0,
      overlayCanvasEl.width,
      overlayCanvasEl.height
    );

    // configura o canvas para desenhar o poligono que ficará sobre o elemento em foco
    overlayCanvasCtx.fillStyle =
      this.options.fadeBackgroundColorHex || 'rgba(0, 0, 0, 1)';
    const cornerRadius = 10;
    const rectX = targetElBoundingClientRect.left - 10 || 0;
    const rectY = targetElBoundingClientRect.top - 10 || 0;
    const rectWidth = targetElBoundingClientRect.width + 20;
    const rectHeight = targetElBoundingClientRect.height + 20;

    // configura o ctx para que os poligonos tenham cantos arredondados
    overlayCanvasCtx.lineJoin = 'round';
    overlayCanvasCtx.lineWidth = cornerRadius;

    // desenha o contorno do poligono
    overlayCanvasCtx.strokeRect(
      rectX + cornerRadius / 2,
      rectY + cornerRadius / 2,
      rectWidth - cornerRadius,
      rectHeight - cornerRadius
    );
    // desenha o preenchimento do poligono
    overlayCanvasCtx.fillRect(
      rectX + cornerRadius / 2,
      rectY + cornerRadius / 2,
      rectWidth - cornerRadius,
      rectHeight - cornerRadius
    );

    // utiliza xor para conseguir fazer o efeito de 'negativo' no poligono
    overlayCanvasCtx.globalCompositeOperation = 'xor';

    // desenha o poligono que ocupara a tela inteira, fazendo com que o
    // globalCompositeOperation === 'xor' exerça o papel desejado sobre o
    // poligono que ficará sobre o elemento em foco
    overlayCanvasCtx.fillStyle =
      this.options.fadeBackgroundColorHex || 'rgba(0, 0, 0, 1)';
    overlayCanvasCtx.fillRect(
      0,
      0,
      overlayCanvasEl.width,
      overlayCanvasEl.height
    );
  }

  public showStep(idx: number) {
    hopscotch.showStep(idx); // Skips to a given step in the tour
  }

  public prevStep() {
    hopscotch.prevStep(); // Goes back one step in the touropscotch.nextStep(); // Goes forward one step in the tour
  }

  /**
   * Ends the current tour. If clearCookie is set to false, the tour state is preserved.
   * Otherwise, if clearCookie is set to true or is not provided, the tour state is cleared.
   */
  public endTour(clearCookie?: boolean) {
    hopscotch.endTour(clearCookie === undefined ? false : clearCookie);
  }

  /**
   * Sets options for running the tour.
   */
  public configure(options: HopscotchConfigOptions) {
    this.options = options;
    hopscotch.configure(this.options);
  }

  public getCurrTour(): string {
    return hopscotch.getCurrTour(); // Returns the currently running tour.
  }

  /**
   * Returns the current zero-based step number.
   */
  public getCurrStepNum(): number {
    return parseInt(hopscotch.getCurrStepNum(), 10);
  }

  /**
   * Checks for tour state saved in sessionStorage/cookies and returns the state if it exists.
   * Use this method to determine whether or not you should resume a tour.
   */
  public getState(): HopscotchState {
    const state: string = hopscotch.getState();
    if (!state) {
      return undefined;
    }
    const splitted = state.split(':');
    if (splitted.length < 2) {
      return undefined;
    }
    return new HopscotchState(splitted[0], parseInt(splitted[1], 10));
  }

  public listen(
    event: 'start' | 'end' | 'next' | 'prev' | 'show' | 'close' | 'error'
  ): Observable<any> {
    return new Observable(observer => {
      // Adds a callback for one of the event types.
      // Valid event types are:
      // *start*, *end*, *next*, *prev*, *show*, *close*, *error*
      hopscotch.listen(event, data => {
        observer.next(data);
      });
    });
  }

  public unlisten(
    event: 'start' | 'end' | 'next' | 'prev' | 'show' | 'close' | 'error'
  ): Observable<any> {
    return new Observable(observer => {
      hopscotch.unlisten(event, data => {
        observer.next(data);
      }); // Removes a callback for one of the event types.
    });
  }

  public removeCallbacks(
    eventName?: 'start' | 'end' | 'next' | 'prev' | 'show' | 'close' | 'error',
    tourOnly?: boolean
  ) {
    // Remove callbacks for hopscotch events. If tourOnly is set to true,
    // only removes callbacks specified by a tour (callbacks set by
    // hopscotch.configure or hopscotch.listen will remain).
    // If eventName is null or undefined, callbacks for all events will be removed.
    if (eventName === undefined && tourOnly === undefined) {
      hopscotch.removeCallbacks();
    } else if (eventName !== undefined && tourOnly !== undefined) {
      hopscotch.removeCallbacks(eventName, tourOnly);
    } else if (eventName === undefined || tourOnly !== undefined) {
      hopscotch.removeCallbacks(tourOnly);
    } else if (eventName !== undefined || tourOnly === undefined) {
      hopscotch.removeCallbacks(eventName);
    }
  }

  public registerHelper(id: string, helperFn: Function) {
    hopscotch.registerHelper(id, helperFn);
  }

  public resetDefaultI18N() {
    hopscotch.resetDefaultI18N(); // Resets i18n strings to original default values.
  }

  public resetDefaultOptions() {
    hopscotch.resetDefaultOptions(); // Resets all config options to original values.
  }
}
