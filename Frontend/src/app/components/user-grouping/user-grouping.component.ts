import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Record } from '../../interfaces/record';
import { RecordService } from '../../services/record.service';

@Component({
  selector: 'app-user-grouping',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbNavModule],
  templateUrl: './user-grouping.component.html',
  styleUrl: './user-grouping.component.scss',
})
export class UserGroupingComponent {
  data: Record[] = [];

  active = '';

  constructor(private recordService: RecordService) {}

  ngOnInit(): void {
    this.fetchRecords();
  }

  fetchRecords(): void {
    this.recordService.getRecordsGroupByUser().subscribe({
      next: (response) => {
        this.active = response.data?.[0]?.id;

        this.data = response?.data?.map((record: Record) => {
          return {
            name: record?.id,
            records: record?.records,
          };
        });
      },
      error: (error) => console.error(error),
      complete: () => {
        console.info('complete');
      },
    });
  }
}
