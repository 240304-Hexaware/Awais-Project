import {
  Component,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, DecimalPipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileService } from '../../services/file.service';
import { ParseDataComponent } from '../parse-data/parse-data.component';
import { ParseFileComponent } from '../parse-file/parse-file.component';
import { SpecFileComponent } from '../spec-file/spec-file.component';
import { FormsModule } from '@angular/forms';
import { Specification } from '../../interfaces/specification';
import { SpecificationService } from '../../services/specification.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    NgbNavModule,
    DecimalPipe,
    FormsModule,
    NgbDropdownModule,
    ParseDataComponent,
    ParseFileComponent,
    SpecFileComponent,
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
  specFileCheck: Boolean;
  specFileSelected: string;

  specList: Specification[] = [];

  constructor(
    private modalService: NgbModal,
    private fileService: FileService,
    private specService: SpecificationService
  ) {
    this.specFileCheck = false;
    this.specFileSelected = '';
  }

  ngOnInit(): void {
    this.fetchSpecifications();
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

    if (!this.specFileCheck) {
      formData.append('specFile', this.fileForm.specFile);

      this.fileService.uploadFiles(formData).subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
        complete: () => console.info('complete'),
      });
    } else {
      this.fileService
        .uploadParseFile(formData, this.specFileSelected)
        .subscribe({
          next: (response) => console.log(response),
          error: (error) => console.log(error),
          complete: () => console.info('complete'),
        });
    }
  }

  openVerticallyCentered(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true });
  }

  fetchSpecifications(): void {
    this.specService.getAllSpecFiles().subscribe({
      next: (response) => {
        this.specList = response?.map((spec: Specification) => {
          return {
            id: spec?.id,
            fileName: spec?.fileName,
          };
        });
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete'),
    });
  }
}
