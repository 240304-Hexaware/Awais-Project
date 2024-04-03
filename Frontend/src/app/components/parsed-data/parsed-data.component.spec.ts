import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParsedDataComponent } from './parsed-data.component';

describe('ParseDataComponent', () => {
  let component: ParsedDataComponent;
  let fixture: ComponentFixture<ParsedDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParsedDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParsedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
