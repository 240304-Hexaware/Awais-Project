import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule, DecimalPipe } from '@angular/common';
import { UserService } from '../../services/user.service';
import { UserPage } from '../../interfaces/user';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Direction, Page, SortFields } from '../../interfaces/page';
import { FormsModule } from '@angular/forms';

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

  constructor(private usersService: UserService) {}

  makeAdmin(id: number)
  {
    this.usersService.makeAdmin(id);
  }

  removeAdmin(id: number)
  {
    this.usersService.removeAdmin(id);
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

  ngOnInit(): void {
    this?.fetchData();
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
