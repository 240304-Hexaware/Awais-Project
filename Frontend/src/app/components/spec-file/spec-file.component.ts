import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { Specification } from '../../interfaces/specification';
import { Direction, Page, SortFields } from '../../interfaces/page';
import { SpecificationService } from '../../services/specification.service';
import {
  NgbDropdownModule,
  NgbModal,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-spec-file',
  standalone: true,
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './spec-file.component.html',
  styleUrl: './spec-file.component.scss',
})
export class SpecFileComponent implements OnInit {
  specification: Specification[] = [];
  specPage: Page = {
    content: 0,
    pageNumber: 1,
    pageSize: 4,
  };
  sortSpec: SortFields = {
    field: 'id',
    direction: Direction?.asc,
  };
  
  constructor(
    private specService: SpecificationService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.fetchSpecifications();
  }

  openVerticallyCentered(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, scrollable: true });
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

  onSortSpec(field: string) {
    this?.fetchSpecifications();
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
}
