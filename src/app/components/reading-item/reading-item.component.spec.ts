import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingItemComponent } from './reading-item.component';

describe('ReadingItemComponent', () => {
  let component: ReadingItemComponent;
  let fixture: ComponentFixture<ReadingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
