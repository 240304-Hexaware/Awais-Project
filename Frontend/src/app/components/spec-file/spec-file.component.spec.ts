import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecFileComponent } from './spec-file.component';

describe('SpecFileComponent', () => {
  let component: SpecFileComponent;
  let fixture: ComponentFixture<SpecFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
