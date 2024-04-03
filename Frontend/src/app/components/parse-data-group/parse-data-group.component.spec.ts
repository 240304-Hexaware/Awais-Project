import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParseDataGroupComponent } from './parse-data-group.component';

describe('ParseDataGroupComponent', () => {
  let component: ParseDataGroupComponent;
  let fixture: ComponentFixture<ParseDataGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParseDataGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParseDataGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
