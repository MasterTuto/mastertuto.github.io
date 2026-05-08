import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabItemCardComponent } from './lab-item-card.component';

describe('LabItemCardComponent', () => {
  let component: LabItemCardComponent;
  let fixture: ComponentFixture<LabItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabItemCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
