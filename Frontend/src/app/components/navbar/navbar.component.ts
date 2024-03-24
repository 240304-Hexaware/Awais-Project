import { Component, inject } from '@angular/core';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgbNavModule, NgbDropdownModule, CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  userService: UserService = inject(UserService);
  collapsed = true;

  logout() {
    console.log('Logout');
    this.userService.logoutRequest();
  }

  loggedIn(): boolean {
    return this.userService.isAuthenticated();
  }
}
