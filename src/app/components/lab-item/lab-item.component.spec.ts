import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabItemComponent } from './lab-item.component';

describe('LabItemComponent', () => {
  let component: LabItemComponent;
  let fixture: ComponentFixture<LabItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
