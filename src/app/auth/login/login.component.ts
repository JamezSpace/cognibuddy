import { Component, computed, signal, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-login',
    imports: [MatIconModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    registration_scheme = signal('login'); // 'login' or 'register'
    heading_text = computed(() => 
        this.registration_scheme() === 'login' ? "Create an account" : "Log in"
    );
    login_step = signal(1);
    age_groups = [
        { name: 'Child', value: 'child' },
        { name: 'Parent', value: 'parent' },
        { name: 'Admin', value: 'admin' }
    ];

    signupFormGroup = new FormGroup({
        full_name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        age_group: new FormControl('', Validators.required),
    })

    signupFormGroup2 = new FormGroup({
        password: new FormControl('')
    })

    get fullName() {
        return this.signupFormGroup.get('full_name')?.value || '';
    }

    get ageGroup() {
        return this.signupFormGroup.get('age_group')?.value || '';
    }

    ageGroupLogin = signal('child');

    emailErrorMessage() {
        if (this.signupFormGroup.controls.email.hasError('required')) {
            return 'You must enter a value';
        } else if (this.signupFormGroup.controls.email.hasError('email')) {
            return 'Not a valid email';
        } else {
            return '';
        }
    }

    nameErrorMessage() {
        if (this.signupFormGroup.controls.full_name.hasError('required')) {
            return 'You must enter a value';
        }
        return '';
    }

    validateInputs() {
        console.log(this.signupFormGroup.value);

        if (!this.signupFormGroup.valid) return this.signupFormGroup.markAllAsTouched(); // show errors

        this.nextPage();
    }

    nextPage() {
        this.login_step.update(num => ++num);
    }

    prevPage() {
        this.login_step.update(num => --num);
    }

    allowOnlyNumbers(event: KeyboardEvent) {
        const allowedKeys = [
            'Backspace',
            'ArrowLeft',
            'ArrowRight',
            'Tab',
            'Delete'
        ];

        // Allow control keys
        if (allowedKeys.includes(event.key)) {
            return;
        }

        // Block non-numeric input
        if (!/^\d$/.test(event.key)) {
            event.preventDefault();
        }
    }

    re_typed_password = signal('');
    pickValue(event: any) {
        this.re_typed_password.set(event.target.value);
    }
    invalidPassword = signal(false);

    isPasswordConfirmed(): boolean {
        const password = this.signupFormGroup.get('password')?.value;
        const confirmPassword = this.re_typed_password();

        if (password !== confirmPassword) {
            this.invalidPassword.set(true);
            alert('Passwords do not match!');
            return false;
        }

        return true;
    }

    registerUser() {
        if (!this.isPasswordConfirmed()) {
            return;
        }

        // Here you would typically send the user data to your backend for registration
        console.log('User registered:', this.signupFormGroup.value);
    }

    loginFormGroup = new FormGroup({
        username: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required)
    })

    renderAppropriateLoginDetails(e: any) {
        this.ageGroupLogin.set(e.target.value);
    }

    loginUser() {
        if (this.ageGroupLogin() === 'child' && (this.loginFormGroup.controls.username.valid && this.loginFormGroup.controls.password.valid)) {
            alert('all data validated. to be submitted to backend')
        } else if(this.ageGroupLogin() !== 'child' && (this.loginFormGroup.controls.email.valid && this.loginFormGroup.controls.password.valid)) {
            alert('all data validated. to be submitted to backend')
        } else return
    }
}
