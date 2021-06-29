import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

/**
 *
 * @param form
 */

function passwordsMatchValidator(form: { get: (arg0: string) => any; }) {
  const password = form.get('password')
  const confirmPassword = form.get('confirmPassword')

  if (password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordsMatch: true })
  } else {
    confirmPassword.setErrors(null)
  }

  return null
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title: string = 'Moon Store';
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ''
    }, {
      validators: passwordsMatchValidator
    })
  }

  register() {
    console.log(this.registerForm.value)
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

}