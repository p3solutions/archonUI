import { AbstractControl } from '@angular/forms';

export class ConfirmPasswordValidator {
    public static MatchPassword(control: AbstractControl) {
        const password = control.get('password').value;

        const confirmPassword = control.get('confirmPassword').value;

        if (password !== confirmPassword) {
            control.get('confirmPassword').setErrors({ ConfirmPassword: true });
        } else {
            return null;
        }
    }
}

export class ConfirmPasswordValidator2 {
    public static MatchPassword(control: AbstractControl) {
        const password = control.get('newPassword').value;

        const confirmPassword = control.get('confirmPassword').value;

        if (password !== confirmPassword) {
            control.get('confirmPassword').setErrors({ ConfirmPassword: true });
        } else {
            return null;
        }
    }
}

export interface ValidationResult {
    [key: string]: boolean;
}

export class PasswordValidator {

    public static strong(control: AbstractControl): ValidationResult {
        const hasNumber = /\d/.test(control.value);
        const hasUpper = /[A-Z]/.test(control.value);
        const hasLower = /[a-z]/.test(control.value);
        const hasSpecial = /[^A-Za-z0-9]/.test(control.value);
        // console.log('Num, Upp, Low', hasNumber, hasUpper, hasLower);
        const valid = hasNumber && hasUpper && hasLower && hasSpecial;
        if (!valid) {
            // return what´s not valid
            return { strong: true };
        }
        return null;
    }
}


export class EmailValidator {

    public static strong(control: AbstractControl): ValidationResult {
        // tslint:disable-next-line:max-line-length
        const hasNumber = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(control.value);
        // console.log('Num, Upp, Low', hasNumber, hasUpper, hasLower);
        const valid = hasNumber;
        if (!valid) {
            // return what´s not valid
            return { strong: true };
        }
        return null;
    }
}
