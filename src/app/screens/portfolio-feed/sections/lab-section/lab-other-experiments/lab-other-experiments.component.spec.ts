import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabOtherExperimentsComponent } from './lab-other-experiments.component';

describe('LabOtherExperimentsComponent', () => {
  let component: LabOtherExperimentsComponent;
  let fixture: ComponentFixture<LabOtherExperimentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabOtherExperimentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabOtherExperimentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
