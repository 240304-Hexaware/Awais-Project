import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Record } from '../../interfaces/record';
import { Page } from '../../interfaces/page';
import { Direction, SortFields } from '../../interfaces/page';
import { RecordService } from '../../services/record.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Parse } from '../../interfaces/parse';
import { ParseService } from '../../services/parse.service';
import { Specification } from '../../interfaces/specification';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NavbarComponent,
    NgbNavModule,
    DecimalPipe,
    CommonModule,
    NgbPaginationModule,
    FormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  active = 1;

  records: Record[] = [];
  parseFiles: Parse[] = [];
  specification: Parse[] = [];

  recordPage: Page = {
    content: 0,
    pageNumber: 1,
    pageSize: 4,
  };
  parseFilePage: Page = {
    content: 0,
    pageNumber: 1,
    pageSize: 4,
  };
  specPage: Page = {
    content: 0,
    pageNumber: 1,
    pageSize: 4,
  };

  sortRecord: SortFields = {
    field: 'id',
    direction: Direction?.asc,
  };
  sortParseFile: SortFields = {
    field: 'id',
    direction: Direction?.asc,
  };
  sortSpec: SortFields = {
    field: 'id',
    direction: Direction?.asc,
  };

  constructor(
    private recordService: RecordService,
    private parseService: ParseService
  ) {}

  ngOnInit(): void {
    this?.fetchData();
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
          }));
        },
        error: (error) => console.error(error),
        complete: () => console.info('complete'),
      });
  }

  fetchParseFiles(): void {
    this.parseService
      .getParseFiles(
        this.parseFilePage.pageNumber - 1,
        this.parseFilePage.pageSize,
        this.sortParseFile?.field,
        this.sortParseFile?.direction
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.parseFilePage.content = response?.totalElements;

          this.parseFiles = response?.content?.map((file: Parse) => ({
            id: file?.id,
            fileName: file?.fileName,
            filePath: file?.filePath,
            specificationId: file?.specificationId,
          }));
        },
        error: (error) => console.error(error),
        complete: () => console.info('complete'),
      });
  }

  fetchSpecifications(): void {
    this.parseService
      .getParseFiles(
        this.specPage.pageNumber - 1,
        this.specPage.pageSize,
        this.sortSpec?.field,
        this.sortSpec?.direction
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.specPage.content = response?.totalElements;

          this.specification = response?.content?.map(
            (spec: Specification) => ({
              id: spec?.id,
              fileName: spec?.fileName,
              filePath: spec?.filePath,
              parseFilesId: spec?.parseFilesId,
            })
          );
        },
        error: (error) => console.error(error),
        complete: () => console.info('complete'),
      });
  }

  fetchData(): void {
    this.fetchRecords();
    this.fetchParseFiles();
    this.fetchSpecifications();
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

  onSortParseFiles(field: string) {
    this?.fetchParseFiles();
  }

  onSortSpec(field: string) {
    this?.fetchSpecifications();
  }
}
