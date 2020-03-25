import { FormGroup } from '@angular/forms';

export const validateFormGroup = (formGroup: FormGroup) => {
    const invalidFields = Object.entries(formGroup.controls).filter(control => control[1].invalid);
    return invalidFields;
}



