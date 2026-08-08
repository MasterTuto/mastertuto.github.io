import { ComponentFixture, TestBed } from '@angular/core/testing';
import localePT from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { ReadingItemComponent } from './reading-item.component';
import { ReadingItemModule } from './reading-item.module';

registerLocaleData(localePT);

describe('ReadingItemComponent', () => {
  let component: ReadingItemComponent;
  let fixture: ComponentFixture<ReadingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReadingItemModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('reading', {
      title: 'A Test Book',
      url: 'https://example.com',
      publisher: 'Example Press',
      author: 'Jane Doe',
      date: new Date('2024-01-01'),
      type: 'book',
      status: 'finished',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
