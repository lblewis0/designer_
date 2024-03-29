import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterContentInit{

  constructor(private el: ElementRef) {}

  public ngAfterContentInit(): void {
    this.el.nativeElement.focus();
  }

}
