import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmValue(
  field1Name: string,
  field2Name: string
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control1 = formGroup.get(field1Name);
    const control2 = formGroup.get(field2Name);

    if (!control1 || !control2 || control1 === control2) {
      return null;
    }

    if (control1.value !== control2.value) {
      control2.setErrors({ ...control2.errors, mismatch: true });
      return null;
    } else {
      if (control2.errors && control2.errors['mismatch']) {
        const errors = { ...control2.errors };
        delete errors['mismatch'];

        control2.setErrors(Object.keys(errors).length ? errors : null);
      }
      return null;
    }
  };
}
