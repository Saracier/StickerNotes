import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appFocus]',
})
export class FocusDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostBinding('style.background-color') backColor = 'transparent';
  @HostBinding('style.color') textColor = 'white';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @HostListener('mouseenter') mouseIsInside(_eventData: Event) {
    this.backColor = 'yellow';
    this.textColor = 'black';
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @HostListener('mouseleave') mouseIsGone(_eventData: Event) {
    this.backColor = 'transparent';
    this.textColor = 'white';
  }
}
