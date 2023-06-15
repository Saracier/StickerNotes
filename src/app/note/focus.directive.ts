import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appFocus]',
})
export class FocusDirective implements OnInit {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostBinding('style.background-color') backColor = 'transparent';

  @HostListener('mouseenter') mouseIsInside(eventData: Event) {
    this.backColor = 'yellow';
  }
  @HostListener('mouseleave') mouseIsGone(eventData: Event) {
    this.backColor = 'transparent';
  }

  // @HostListener('mouseenter') mouseIsInside(eventData: Event) {
  //   this.renderer.setStyle(
  //     this.elRef.nativeElement,
  //     'background-color',
  //     'yellow'
  //   );
  // }
  // @HostListener('mouseleave') mouseIsGone(eventData: Event) {
  //   this.renderer.setStyle(
  //     this.elRef.nativeElement,
  //     'background-color',
  //     'transparent'
  //   );
  // }
  ngOnInit() {
    // ;
    // constructor(private elRef: ElementRef, private renderer: Renderer2) {}
    // ngOnInit() {
    //   this.renderer.setStyle(
    //     this.elRef.nativeElement,
    //     'background-color',
    //     'yellow'
    //   );
  }
}
