import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingsSectionComponent } from './readings-section.component';

describe('ReadingsSectionComponent', () => {
  let component: ReadingsSectionComponent;
  let fixture: ComponentFixture<ReadingsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingsSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
