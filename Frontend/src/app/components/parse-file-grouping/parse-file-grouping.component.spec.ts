import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParseFileGroupingComponent } from './parse-file-grouping.component';

describe('ParseDataGroupingComponentComponent', () => {
  let component: ParseFileGroupingComponent;
  let fixture: ComponentFixture<ParseFileGroupingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParseFileGroupingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParseFileGroupingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
