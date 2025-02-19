import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static dniValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^\d{8}$/.test(control.value);
      return valid ? null : { dniInvalid: true };
    };
  }

  static phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^9\d{8}$/.test(control.value);
      return valid ? null : { phoneInvalid: true };
    };
  }

  static emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(control.value);
      return valid ? null : { emailInvalid: true };
    };
  }
}