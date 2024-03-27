import { Component, TemplateRef } from '@angular/core';
import { Record } from '../../interfaces/record';
import { Direction, Page, SortFields } from '../../interfaces/page';
import { RecordService } from '../../services/record.service';
import {
  NgbDropdownModule,
  NgbModal,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parse-data',
  standalone: true,
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './parse-data.component.html',
  styleUrl: './parse-data.component.scss',
})
export class ParseDataComponent {
  records: Record[] = [];

  recordPage: Page = {
    content: 0,
    pageNumber: 1,
    pageSize: 4,
  };

  sortRecord: SortFields = {
    field: 'id',
    direction: Direction?.asc,
  };

  constructor(
    private recordService: RecordService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.fetchRecords();
  }

  openVerticallyCentered(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, scrollable: true });
  }

  fetchRecords(): void {
    this.recordService
      .getRecords(
        this.recordPage.pageNumber - 1,
        this.recordPage.pageSize,
        this.sortRecord?.field,
        this.sortRecord?.direction
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.recordPage.content = response?.totalElements;

          this.records = response?.content?.map((record: Record) => ({
            id: record?.id,
            taskID: record?.taskID,
            description: record?.description,
            priority: record?.priority,
            dueDate: record?.dueDate,
            assignee: record?.assignee,
            user: record?.user,
            parseFileName: record?.parseFileName,
            parseFileId: record?.parseFileId,
            specificationName: record?.specificationName,
            specificationId: record?.specificationId,
          }));
        },
        error: (error) => console.error(error),
        complete: () => console.info('complete'),
      });
  }

  onSortRecords(field: string) {
    switch (field) {
      case 'id': {
        if (this.sortRecord.direction === Direction?.asc)
          this.sortRecord.direction = Direction?.desc;
        else this.sortRecord.direction = Direction?.asc;
        break;
      }
      case 'name': {
        if (this.sortRecord.direction === Direction?.asc)
          this.sortRecord.direction = Direction?.desc;
        else this.sortRecord.direction = Direction?.asc;
        break;
      }
      case 'email': {
        if (this.sortRecord.direction === Direction?.asc)
          this.sortRecord.direction = Direction?.desc;
        else this.sortRecord.direction = Direction?.asc;
        break;
      }
      case 'roles': {
        if (this.sortRecord.direction === Direction?.asc)
          this.sortRecord.direction = Direction?.desc;
        else this.sortRecord.direction = Direction?.asc;
        break;
      }
    }
    this.sortRecord.field = field;

    this?.fetchRecords();
  }
}
