import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, signal, computed, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    imports: [MatIconModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthComponent {
    private authService: AuthService;
    constructor(authService: AuthService) {
        this.authService = authService;
    }
    router = inject(Router);

    loading = signal(false);
    registration_scheme = signal('login'); // 'login' or 'register'
    heading_text = computed(() =>
        this.registration_scheme() === 'login' ? "Log in" : "Create an account"
    );
    login_step = signal(1);
    age_groups = [
        { name: 'Child', value: 'child' },
        { name: 'Parent', value: 'parent' },
        { name: 'Admin', value: 'admin' }
    ];
    age_group_signup = this.age_groups.filter(group => group.value !== 'child');

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

    emailErrorMessage(formGroup: FormGroup) {
        if (formGroup.controls['email'].hasError('required')) {
            return 'You must enter a value';
        } else if (formGroup.controls['email'].hasError('email')) {
            return 'Not a valid email';
        } else {
            return '';
        }
    }

    nameErrorMessage(formGroup: FormGroup) {
        if (formGroup.controls['full_name'].hasError('required')) {
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
        const password = this.signupFormGroup2.get('password')?.value;
        const confirmPassword = this.re_typed_password();

        if (password !== confirmPassword) {
            this.invalidPassword.set(true);
            return false;
        }

        return true;
    }

    async registerUser() {
        if (!this.isPasswordConfirmed()) {
            return;
        }

        // Here you would typically send the user data to your backend for registration
        console.log('User registered:', this.signupFormGroup.value);

        this.loading.set(true);

        const response = await this.authService.signUp({
            name: this.signupFormGroup.value.full_name || '',
            email: this.signupFormGroup.value.email || '',
            password: this.signupFormGroup2.value.password || '',
            role: this.signupFormGroup.value.age_group || ''
        });

        if (response.userId) {
            this.loading.set(false);
            this.router.navigate(['/auth/login']);
        } else {
            this.loading.set(false);
            alert('An error occurred while registering. Please try again.');
            return;
        }
    }

    loginFormGroup = new FormGroup({
        username: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required)
    })

    renderAppropriateLoginDetails(e: any) {
        this.ageGroupLogin.set(e.target.value);
    }

    loginError = signal({valid: false, message: ''});

    async loginUser() {
        const isChild = this.ageGroupLogin() === 'child';
        const controls = this.loginFormGroup.controls;

        const isValid =
            (isChild && controls.username.valid && controls.password.valid) ||
            (!isChild && controls.email.valid && controls.password.valid);

        if (!isValid) return;

        this.loading.set(true);

        const response = await this.authService.login({
            name: controls.username.value || '',
            email: controls.email.value || '',
            password: controls.password.value || '',
            role: this.ageGroupLogin() || ''
        });

        this.loading.set(false);

        if (!response) {
            alert('An error occurred while logging in. Please try again.');
            return;
        }

        if (response.valid === false) {
            this.loginError.set({valid: false, message: response.message});
            return;
        } 

        localStorage.setItem('access_token', response.accessToken);
        localStorage.setItem('user_id', response.id);
        localStorage.setItem('user_name', response.name);
        localStorage.setItem('user_role', this.ageGroupLogin());
        this.router.navigate([`/dashboard/${this.ageGroupLogin()}`]);
    }

}
