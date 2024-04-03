import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecGroupingComponent } from './spec-grouping.component';

describe('SpecGroupingComponent', () => {
  let component: SpecGroupingComponent;
  let fixture: ComponentFixture<SpecGroupingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecGroupingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecGroupingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
