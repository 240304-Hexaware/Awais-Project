import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  edit: boolean = false;

  userForm!: FormGroup;
  user: User = {
    id: null,
    name: '',
    email: '',
    password: '',
    roles: '',
    blocked: false,
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl({ value: '', disabled: true }, Validators.required),
      email: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.minLength(8),
      ]),
      roles: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.pattern('ROLE_.+'),
      ]),
    });

    this?.fetchUser();
  }

  fetchUser(): void {
    this.userService.getUser().subscribe({
      next: (response) => {
        this.user = { ...response?.data, password: '' };
        this.userForm.setValue({
          name: response?.data?.name,
          email: response?.data?.email,
          password: '',
          roles: response?.data?.roles,
        });
      },
      error: (error) => console.log(error),
      complete: () => console.log('Successful'),
    });
  }

  editProfile(): void {
    console.log(this.user);
    this.edit = true;
    this.userForm.enable();
    this.userForm.get('email')?.disable();
    this.userForm.get('roles')?.disable();
  }

  cancelEdit(): void {
    this.edit = false;
    this.userForm.disable();
  }

  updateProfile(): void {
    this.user.name = this.userForm.get('name')?.value;
    this.user.password = this.userForm.get('password')?.value;
    this.userService.updateUser(this.user);
    this.edit = false;
    
    this.userForm.disable();
  }
}
