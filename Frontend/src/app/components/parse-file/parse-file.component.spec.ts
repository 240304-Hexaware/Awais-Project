import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParseFileComponent } from './parse-file.component';

describe('ParseFileComponent', () => {
  let component: ParseFileComponent;
  let fixture: ComponentFixture<ParseFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParseFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParseFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
