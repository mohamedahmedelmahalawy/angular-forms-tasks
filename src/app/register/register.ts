import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { confirmValue } from '../validation';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-z0-9]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        username: ['', [Validators.required, Validators.pattern(/^\S+$/)]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
        addresses: this.fb.array([]),
      },
      {
        validator: confirmValue('password', 'confirmPassword'),
      }
    );
  }

  get nameControl() {
    return this.registrationForm.get('name');
  }

  get emailControl() {
    return this.registrationForm.get('email');
  }

  get usernameControl() {
    return this.registrationForm.get('username');
  }

  get passwordControl() {
    return this.registrationForm.get('password');
  }

  get confirmPasswordControl() {
    return this.registrationForm.get('confirmPassword');
  }

  get addressesControl() {
    return this.registrationForm.get('addresses') as FormArray;
  }

  getFormControl(controlName: string) {
    return this.registrationForm.get(controlName);
  }

  createNewAddressGroup(): FormGroup {
    return this.fb.group({
      address: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
    });
  }

  addAddressField(): void {
    this.addressesControl.push(this.createNewAddressGroup());
  }

  removeAddressField(index: number): void {
    this.addressesControl.removeAt(index);
  }

  onSubmitRegistration(): void {
    if (this.registrationForm.valid) {
      console.log('Registration Form Data:', this.registrationForm.value);
    } else {
      console.error('Form is invalid. Please check all fields.');
      this.registrationForm.markAllAsTouched();
    }
  }
}
