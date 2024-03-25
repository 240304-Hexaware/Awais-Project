import {
  Component,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import {
  NgbDropdownModule,
  NgbNavModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { Record } from '../../interfaces/record';
import { Page } from '../../interfaces/page';
import { Direction, SortFields } from '../../interfaces/page';
import { RecordService } from '../../services/record.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Parse } from '../../interfaces/parse';
import { ParseService } from '../../services/parse.service';
import { Specification } from '../../interfaces/specification';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpecificationService } from '../../services/specification.service';
import { FileService } from '../../services/file.service';

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
    NgbDropdownModule,
    ReactiveFormsModule,
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  fileForm = {
    parseFile: '',
    specFile: '',
  };

  records: Record[] = [];
  parseFiles: Parse[] = [];
  specification: Specification[] = [];

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
    private parseService: ParseService,
    private specService: SpecificationService,
    private modalService: NgbModal,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this?.fetchData();
  }

  onParseFile(event: any): void {
    const file = event.target.files[0];
    this.fileForm.parseFile = file;
  }

  onSpecFile(event: any): void {
    const file = event.target.files[0];
    this.fileForm.specFile = file;
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('parseFile', this.fileForm.parseFile);
    formData.append('specFile', this.fileForm.specFile);

    this.fileService.uploadFiles(formData).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
      complete: () => console.info('complete'),
    });
  }

  openVerticallyCentered(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, scrollable: true });
  }

  beautifyJSON(inputJSON: string) {
    let formattedJSON: string = '';
    try {
      const parsedJSON = JSON.parse(inputJSON);
      formattedJSON = JSON.stringify(parsedJSON, null, 2);
    } catch (error) {
      console.error('Invalid JSON:', error);
      formattedJSON = 'Invalid JSON';
    }

    return formattedJSON;
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
            specificationName: file?.specificationName,
            specificationId: file?.specificationId,
            user: file?.user,
          }));
        },
        error: (error) => console.error(error),
        complete: () => console.info('complete'),
      });
  }

  fetchSpecifications(): void {
    this.specService
      .getSpecFiles(
        this.specPage.pageNumber - 1,
        this.specPage.pageSize,
        this.sortSpec?.field,
        this.sortSpec?.direction
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.specPage.content = response?.totalElements;

          this.specification = response?.content?.map((spec: Specification) => {
            console.log(spec);
            return {
              id: spec?.id,
              fileName: spec?.fileName,
              parseFiles: spec?.parseFiles?.map((parseFiles: any) => ({
                parseFileName: parseFiles?.parse_file_Name,
                parseFileId: parseFiles?.parse_file_id,
              })),
              json: spec?.json,
              user: spec?.user,
            };
          });
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
