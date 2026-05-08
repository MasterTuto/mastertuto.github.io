import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabSectionComponent } from './lab-section.component';

describe('LabSectionComponent', () => {
  let component: LabSectionComponent;
  let fixture: ComponentFixture<LabSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
