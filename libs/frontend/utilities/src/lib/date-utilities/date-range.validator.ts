import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export function datesRangeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const start:Date | null = control.get("dateStartAt")?.value;

        // const end:Date = form.get("dateEndAt").value;
        const end: Date | null = control.get("dateEndAt")?.value;

        if (start && end) {
            const isRangeValid = (end.getTime() - start.getTime() > 0);

            return isRangeValid ? null : {promoPeriod:true};
        }

        return null;
    }
}
