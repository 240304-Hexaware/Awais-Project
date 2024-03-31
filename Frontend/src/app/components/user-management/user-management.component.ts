import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule, DecimalPipe } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User, UserPage } from '../../interfaces/user';
import {
  NgbDropdownModule,
  NgbModal,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { Direction, Page, SortFields } from '../../interfaces/page';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    NavbarComponent,
    DecimalPipe,
    CommonModule,
    NgbDropdownModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
})
export class UserManagementComponent implements OnInit {
  users: UserPage[] = [];
  page: Page = {
    content: 0,
    pageNumber: 1,
    pageSize: 4,
  };
  sort: SortFields = {
    field: 'id',
    direction: Direction?.asc,
  };

  userForm!: FormGroup;

  constructor(
    private modalService: NgbModal,
    private usersService: UserService
  ) {}

  ngOnInit(): void {
    this?.fetchData();

    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        this.matchPassword,
      ]),
      roles: new FormControl('', [
        Validators.required,
        Validators.pattern('ROLE_.+'),
      ]),
    });
  }

  matchPassword(control: AbstractControl): { mismatch: boolean } | null {
    const password = control.root.get('password')?.value;
    const confirmPassword = control.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  openVerticallyCentered(content: TemplateRef<any>) {
    this.modalService.open(content, { scrollable: true });
  }

  handleSubmit(model: any): void {
    this.onSubmit(model);
  }

  onSubmit(model: any): void {
    if (this.userForm && this.userForm.valid) {
      // Form is valid, do something

      let user: User = {
        id: null,
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        roles: this.userForm.value.roles,
        blocked: false,
      };

      this.usersService.createUser(user);
      model.close('Close click');
      this.userForm.reset();
    } else {
      // Form is invalid, display error messages

      alert('Form is invalid');
    }
  }

  makeAdmin(id: number) {
    this.usersService.makeAdmin(id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => console.log(error),
      complete: () => {
        this.fetchData();
      },
    });
  }

  removeAdmin(id: number) {
    this.usersService.removeAdmin(id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => console.log(error),
      complete: () => {
        this.fetchData();
      },
    });
  }

  blockUser(id: number) {
    this.usersService.blockUser(id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => console.log(error),
      complete: () => {
        this.fetchData();
      },
    });
  }

  unblockUser(id: number) {
    this.usersService.unblockUser(id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => console.log(error),
      complete: () => {
        this.fetchData();
      },
    });
  }

  fetchData(): void {
    this.usersService
      .getUsers(
        this.page.pageNumber - 1,
        this.page.pageSize,
        this.sort?.field,
        this.sort?.direction
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.page.content = response?.totalElements;

          this.users = response?.content?.map((user: UserPage) => ({
            id: user?.id,
            name: user?.name,
            email: user?.email,
            roles: user?.roles,
            blocked: user?.blocked,
          }));
        },
        error: (error) => console.error(error),
        complete: () => console.info('complete'),
      });
  }

  parseId(id: number | undefined): number {
    if (id === undefined) return 0;
    return parseInt(id?.toString()?.slice(18, 24), 16);
  }

  onSort(field: string) {
    switch (field) {
      case 'id': {
        if (this.sort.direction === Direction?.asc)
          this.sort.direction = Direction?.desc;
        else this.sort.direction = Direction?.asc;
        break;
      }
      case 'name': {
        if (this.sort.direction === Direction?.asc)
          this.sort.direction = Direction?.desc;
        else this.sort.direction = Direction?.asc;
        break;
      }
      case 'email': {
        if (this.sort.direction === Direction?.asc)
          this.sort.direction = Direction?.desc;
        else this.sort.direction = Direction?.asc;
        break;
      }
      case 'roles': {
        if (this.sort.direction === Direction?.asc)
          this.sort.direction = Direction?.desc;
        else this.sort.direction = Direction?.asc;
        break;
      }
    }
    this.sort.field = field;

    this?.fetchData();
  }
}
