import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoverIconComponent } from './hover-icon.component';
import { NgIconsModule } from '@ng-icons/core';
import { tablerStack2 } from '@ng-icons/tabler-icons';

describe('HoverIconComponent', () => {
  let component: HoverIconComponent;
  let fixture: ComponentFixture<HoverIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HoverIconComponent,
        NgIconsModule.withIcons({ tablerStack2 })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoverIconComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('icon', 'tablerStack2');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
