import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioFeedComponent } from './portfolio-feed.component';

describe('PortfolioFeedComponent', () => {
  let component: PortfolioFeedComponent;
  let fixture: ComponentFixture<PortfolioFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
