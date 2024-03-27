import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParseDataComponent } from './parse-data.component';

describe('ParseDataComponent', () => {
  let component: ParseDataComponent;
  let fixture: ComponentFixture<ParseDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParseDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParseDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
