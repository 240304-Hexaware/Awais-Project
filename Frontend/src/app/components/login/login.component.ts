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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userService: UserService = inject(UserService);

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
    // this.userService.getUsers(0, 5, 'id', 'ASC').subscribe((response) => {
    //   console.log(response);
    // });
  }

  login() {
    if (this.loginForm && this.loginForm.valid) {
      this.userService.loginRequest(this.loginForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
