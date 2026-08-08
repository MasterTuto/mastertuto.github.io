import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionComponent } from './section.component';
import { TranslateService } from 'src/app/service/translate.service';

describe('SectionComponent', () => {
  let component: SectionComponent;
  let fixture: ComponentFixture<SectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SectionComponent ],
      providers: [
        { provide: TranslateService, useValue: { translate: (key: string) => key } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('name', 'test-section');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
