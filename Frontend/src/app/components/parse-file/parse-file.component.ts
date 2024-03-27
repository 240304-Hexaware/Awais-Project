import { Component, TemplateRef } from '@angular/core';
import { Parse } from '../../interfaces/parse';
import { Direction, Page, SortFields } from '../../interfaces/page';
import { ParseService } from '../../services/parse.service';
import {
  NgbDropdownModule,
  NgbModal,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parse-file',
  standalone: true,
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './parse-file.component.html',
  styleUrl: './parse-file.component.scss',
})
export class ParseFileComponent {
  parseFiles: Parse[] = [];
  parseFilePage: Page = {
    content: 0,
    pageNumber: 1,
    pageSize: 4,
  };
  sortParseFile: SortFields = {
    field: 'id',
    direction: Direction?.asc,
  };

  constructor(
    private parseService: ParseService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.fetchParseFiles();
  }

  openVerticallyCentered(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, scrollable: true });
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

  onSortParseFiles(field: string) {
    this?.fetchParseFiles();
  }
}
