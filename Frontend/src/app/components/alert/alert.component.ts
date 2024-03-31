import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgbAlertModule, CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  active: Boolean = true;

  @Input() message: string = '';
  @Input() type: string = '';

  constructor() {
    setTimeout(() => {
      this.close();
    }, 2000);
  }

  close() {
    this.active = false;
  }
}
