import { Directive, Renderer, ElementRef, forwardRef, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR, DefaultValueAccessor } from '@angular/forms';

const LOWERCASE_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => LowerCaseInputDirective),
  multi: true,
};

@Directive({
  selector: 'input[lowercase]',
  host: {
    // When the user updates the input
    '(input)': 'onInput($event.target.value)',
    '(blur)': 'onTouched()',
  },
  providers: [
    LOWERCASE_INPUT_CONTROL_VALUE_ACCESSOR,
  ],
})
export class LowerCaseInputDirective extends DefaultValueAccessor {

  constructor(renderer: Renderer2, elementRef: ElementRef) {
    super(renderer, elementRef, false);
  }

  writeValue(value: any): void {
    const transformed = this.transformValue(value);

    super.writeValue(transformed);
  }

  onInput(value: any): void {
    const transformed = this.transformValue(value);

    super.writeValue(transformed);
    this.onChange(transformed);
  }

  private transformValue(value: any): any {
    const result = value && typeof value === 'string'
      ? value.toLowerCase()
      : value;

    return result;
  }
}
