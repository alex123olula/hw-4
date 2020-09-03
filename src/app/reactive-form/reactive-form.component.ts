import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../utils/password-validator';

@Component({
    selector   : 'app-reactive-form',
    templateUrl: './reactive-form.component.html',
    styleUrls  : ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
    form: FormGroup;

    constructor(
        private fb: FormBuilder
    ) {

        this.form = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
            emails  : this.fb.array([]),
            password: [null, [Validators.required,
                CustomValidators.patternValidator(/\d/, {hasNumber: true}),
                CustomValidators.patternValidator(/[a-z]/, {hasSmallCase: true})
            ]]
        });
    }

    get usernameField() {
        return this.form.get('username');
    }

    get usernameFieldIsValid() {
        return this.usernameField.dirty && this.usernameField.valid;
    }

    get usernameFieldInvalid() {
        return this.usernameField.dirty && this.usernameField.invalid;
    }

    get emailFieldIsValid() {
        return this.emailsFormArray.dirty && this.emailsFormArray.valid;
    }

    get emailsFormArray(): FormArray {

        return this.form.get('emails') as FormArray;
    }

    get passwordField() {
        return this.form.get('password');
    }

    get passwordIsValid() {
        return this.passwordField.valid && this.passwordField.dirty;
    }

    get passwordInvalid() {
        // return this.passwordField.dirty &&form.controls['password'].invalid && passwordField.dirty
        return this.passwordField.invalid && this.passwordField.dirty;

    }

    ngOnInit(): void {
        this.addEmailsControl();
    }

    addEmailsControl() {

        this.emailsFormArray.push(new FormControl(null,
            [Validators.required, Validators.pattern(
                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)]
        ));

    }

    removeEmailsControl(index: number) {
        const emails = this.emailsFormArray;
        if (emails.length > 1) {
            emails.removeAt(index);
        } else {
            emails.reset();
        }
    }

    onSubmit(event: Event) {
        event.preventDefault();
        if (this.form.valid) {
            const value = this.form.value;
            console.log(value);
            this.form.reset();
        }
    }

    oneEmailInvalid(index: number) {
        return this.emailsFormArray.at(index).invalid && this.emailsFormArray.at(index).dirty;
    }

    oneEmailValid(index: number) {
        return this.emailsFormArray.at(index).valid && this.emailsFormArray.at(index).dirty;
    }
}
