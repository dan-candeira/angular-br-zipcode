import { Directive, forwardRef } from '@angular/core';
import {
  Validator,
  AbstractControl,
  NG_ASYNC_VALIDATORS,
} from '@angular/forms';
import { Observable, of } from 'rxjs';

@Directive({
  selector: '[appValidateCEPs]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => ValidateCEPsDirective),
      multi: true,
    },
  ],
})
export class ValidateCEPsDirective implements Validator {
  validate(
    control: AbstractControl
  ): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> {
    /* ↓ checa se o padrão é 00000000 */
    const regex = new RegExp(/^\d{8,8}$/);
    /* ↓ remove espaços em branco da string */
    const ceps = control.value
      .split(';')
      .map((c: string) => c.replace(/\s/g, ''));

    const isInvalid = !ceps.every((c: string) => regex.test(c));

    if (control.value && isInvalid) {
      return of({ invalidCeps: isInvalid });
    }

    return of({});
  }
}
