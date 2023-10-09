import { AbstractControl } from '@angular/forms';

export function dateRangeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;

    if (startDate && endDate && startDate > endDate) {
        return { dateRangeInvalid: true };
    }

    return { dateRangeValidator: false };
}