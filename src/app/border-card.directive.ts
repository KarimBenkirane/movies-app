import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBorderCard]',
  standalone: true,
})
export class BorderCardDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder('4px solid var(--blue-main)');
    this.setBorderRadius('22px');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder('transparent');
    this.setBorderRadius('0');
  }

  setBorder(color: string) {
    this.el.nativeElement.style.border = color;
  }

  setBorderRadius(radius: string) {
    this.el.nativeElement.style.borderRadius = radius;
  }
}
