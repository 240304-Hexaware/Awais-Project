import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Record } from '../../interfaces/record';
import { RecordService } from '../../services/record.service';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-spec-grouping',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbNavModule],
  templateUrl: './spec-grouping.component.html',
  styleUrl: './spec-grouping.component.scss',
})
export class SpecGroupingComponent {
  data: Record[] = [];

  active = '';

  constructor(private recordService: RecordService) {}

  ngOnInit(): void {
    this.fetchRecords();
  }

  fetchRecords(): void {
    this.recordService.getRecordsGroupBySpecFile().subscribe({
      next: (response) => {
        this.active = response.data?.[0]?.name;

        this.data = response?.data?.map((record: Record) => {
          return {
            id: record?.id,
            name: record?.name,
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
