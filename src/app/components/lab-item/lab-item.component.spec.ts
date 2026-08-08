import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabItemComponent } from './lab-item.component';
import { LabItemModule } from './lab-item.module';

describe('LabItemComponent', () => {
  let component: LabItemComponent;
  let fixture: ComponentFixture<LabItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LabItemModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('experiment', {
      name: 'Test',
      description: 'A test experiment',
      interestingLevel: 1,
      link: 'https://example.com',
      cover: 'cover.png',
      icon: 'tablerStack2',
      knowledges: ['Angular'],
      explanation: 'An explanation',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
