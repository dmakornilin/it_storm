import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[PasswordRepeat]',
  providers: [{provide: NG_VALIDATORS, useExisting: PasswordRepeat,multi: true }],
})
export class PasswordRepeat implements Validator {


  validate(control: AbstractControl): ValidationErrors | null {
    const psw= control.get('password');
    const pswRpt= control.get('passwordRepeat');

    if (psw?.value !== pswRpt?.value) {
      pswRpt?.setErrors({passwordRepeat:true})
      return {passwordRepeat:true};
    }
    return null;
  }

}
