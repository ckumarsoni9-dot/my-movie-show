import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'admin-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <pre>
Admin Login

<form [formGroup]="form" (ngSubmit)="login()">
  <label>Username: <input formControlName="username" /></label>
  <br />
  <label>Password: <input formControlName="password" type="password" /></label>
  <br />
  <button type="submit">Login</button>
</form>
@if(error){<span style="color: red;">{{ error }}</span>}

    </pre>
  `
})
export class AdminLoginComponent implements OnInit {
  form!:FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
    username: '',
    password: ''
  });
  }

  login() {
    const { username, password } = this.form.value;
    if (this.auth.login(username ?? '', password ?? '')) {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.error = 'Invalid credentials';
    }
  }
}