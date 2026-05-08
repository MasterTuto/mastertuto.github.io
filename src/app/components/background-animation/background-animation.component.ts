import { Component, Input, OnInit } from '@angular/core';
import { ShapeElement } from './models/shape-element.model';

@Component({
  selector: 'app-background-animation',
  templateUrl: './background-animation.component.html',
  styleUrls: ['./background-animation.component.scss']
})
export class BackgroundAnimationComponent implements OnInit {
  @Input() shape: 'circle' = 'circle';

  private numberOfElements: number = 50;
  elements: ShapeElement[] = [];

  constructor() { }

  ngOnInit(): void {
    const shapeClasses = [
      'h-1 w-1',
      'h-2 w-2',
      'h-3 w-3',
      'h-3.5 w-3.5',
      'h-4 w-4',
      'h-4.5 w-4.5',
      'h-5 w-5',
      'h-5.5 w-5.5'
    ];

    const svgClasses = [
      'bg-slate-100/5',
      'bg-slate-100/10',
      'bg-slate-100/15',
      'bg-slate-100/20',
      'bg-slate-100/25',
      'bg-slate-100/30',
      'bg-slate-100/40',
      'bg-slate-100/50',
      'bg-slate-100/60',
    ];

    this.elements = Array.from({length: this.numberOfElements})
        .map(() => ({
          id: Math.random().toString(),
          shapeClass: this.takeRandom(shapeClasses),
          svgClass: this.takeRandom(svgClasses)
        }));     
  }

  takeRandom<T>(elements: T[]): T {
    const index = Math.floor(elements.length * Math.random());
    return elements[index];
  }

  trackById(index: number, element: ShapeElement) {
    return element.id;
  }
}
