import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]'
})
export class OnlyNumbersDirective {

  constructor() { }

  @HostListener('keypress', ['$event']) onKeyPress(e: KeyboardEvent) {
    //In the current field you can only type numbers - so why not type a number? So you can type a number that starts with 0
    if (e.keyCode < 48 || e.keyCode > 57) {
      e.preventDefault()
    }
  }
}
