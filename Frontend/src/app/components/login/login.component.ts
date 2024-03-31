import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, AlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userService: UserService = inject(UserService);

  alert = {
    type: '',
    message: '',
  };

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  check() {
    this.userService.adminControl();
  }

  login() {
    if (this.loginForm && this.loginForm.valid) {
      this.alert = this.userService.loginRequest(this.loginForm.value);
    } else {
      console.log('Form is invalid');
      this.alert.message = 'Form is invalid';
      this.alert.type = 'danger';
    }
  }
}
