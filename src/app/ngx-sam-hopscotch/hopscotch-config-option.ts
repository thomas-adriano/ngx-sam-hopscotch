import { Hopscotch_i18n } from "./hopscotch-i18n";

export class HopscotchConfigOption {
  id: string;
  bubbleWidth: number;
  bubblePadding: number;
  smoothScroll: boolean;
  scrollDuration: number;
  scrollTopMargin: number;
  showCloseButton: boolean;
  showPrevButton: boolean;
  showNextButton: boolean;
  arrowWidth: number;
  skipIfNoElement: boolean;
  nextOnTargetClick: boolean;
  onNext: Function;
  onPrev: Function;
  onStart: Function;
  onEnd: Function;
  onClose: Function;
  onError: Function;
  i18n: Hopscotch_i18n;
}
