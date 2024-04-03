import { Component } from '@angular/core';
import { ParseFileGroupingComponent } from '../parse-file-grouping/parse-file-grouping.component';
import { SpecGroupingComponent } from '../spec-grouping/spec-grouping.component';
import { UserGroupingComponent } from '../user-grouping/user-grouping.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-parse-data-group',
  standalone: true,
  imports: [
    ParseFileGroupingComponent,
    SpecGroupingComponent,
    UserGroupingComponent,
    NgbNavModule,
  ],
  templateUrl: './parse-data-group.component.html',
  styleUrl: './parse-data-group.component.scss',
})
export class ParseDataGroupComponent {}
