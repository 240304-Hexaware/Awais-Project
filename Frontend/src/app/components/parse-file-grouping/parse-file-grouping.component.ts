import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Record } from '../../interfaces/record';
import { RecordService } from '../../services/record.service';

@Component({
  selector: 'app-parse-file-grouping',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbNavModule],
  templateUrl: './parse-file-grouping.component.html',
  styleUrl: './parse-file-grouping.component.scss',
})
export class ParseFileGroupingComponent {
  data: Record[] = [];

  active = '';

  constructor(private recordService: RecordService) {}

  ngOnInit(): void {
    this.fetchRecords();
  }

  fetchRecords(): void {
    this.recordService.getRecordsGroupByParseFile().subscribe({
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
