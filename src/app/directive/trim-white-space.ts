import { Directive, HostListener, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[trimWhiteSpace]',
  standalone: true // Use true if you are on Angular 14+ standalone components
})
export class TrimDirective {
  // Inject NgControl to gain access to the underlying form control
  constructor(@Optional() private ngControl: NgControl) {}

  @HostListener('blur') 
  onBlur(): void {
    if (!this.ngControl || !this.ngControl.control) {
      return;
    }

    const currentVal = this.ngControl.value;

    // Check if the value is a string and trim it
    if (typeof currentVal === 'string') {
      this.ngControl.control.setValue(currentVal.trim(), {
        emitEvent: true, // Set to false if you do not want to trigger valueChanges
        emitModelToViewChange: true // Forces the HTML input field to update its text
      });
    }
  }
}
