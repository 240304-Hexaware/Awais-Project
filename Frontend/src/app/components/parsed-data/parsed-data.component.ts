import { Component, TemplateRef } from '@angular/core';
import { Records } from '../../interfaces/record';
import { RecordService } from '../../services/record.service';
import {
  NgbDropdownModule,
  NgbModal,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { Direction, Page, SortFields } from '../../interfaces/page';
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
  templateUrl: './parsed-data.component.html',
  styleUrl: './parsed-data.component.scss',
})
export class ParsedDataComponent {
  records: Records[] = [];
  parseDatePage: Page = {
    content: 0,
    pageNumber: 1,
    pageSize: 10,
  };
  sortParseData: SortFields = {
    field: 'id',
    direction: Direction?.asc,
  };

  constructor(
    private recordService: RecordService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.fetchParseData();
  }

  openVerticallyCentered(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, scrollable: true });
  }

  fetchParseData(): void {
    this.recordService
      .getRecords(
        this.parseDatePage.pageNumber - 1,
        this.parseDatePage.pageSize,
        this.sortParseData?.field,
        this.sortParseData?.direction
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.parseDatePage.content = response?.totalElements;

          this.records = response?.content?.map((record: Records) => ({
            id: record?.id,
            user: record?.user,
            date: new Date(parseInt(record?.id?.substring(0, 8), 16) * 1000),
            fields: record?.fields,
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

  onSortParseFiles(field: string) {

    switch (field) {
      case 'id': {
        if (this.sortParseData.direction === Direction?.asc)
          this.sortParseData.direction = Direction?.desc;
        else this.sortParseData.direction = Direction?.asc;
        break;
      }
      case 'user': {
        if (this.sortParseData.direction === Direction?.asc)
          this.sortParseData.direction = Direction?.desc;
        else this.sortParseData.direction = Direction?.asc;
        break;
      }
      case 'parseFileName': {
        if (this.sortParseData.direction === Direction?.asc)
          this.sortParseData.direction = Direction?.desc;
        else this.sortParseData.direction = Direction?.asc;
        break;
      }
      case 'specificationName': {
        if (this.sortParseData.direction === Direction?.asc)
          this.sortParseData.direction = Direction?.desc;
        else this.sortParseData.direction = Direction?.asc;
        break;
      }
    }
    this.sortParseData.field = field;

    this?.fetchParseData();
  }

}
