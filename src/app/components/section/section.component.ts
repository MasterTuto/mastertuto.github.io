import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
  @Input() name: string = "";
  @Input() title: string = "";
  @Input() containerClass: string = "";

  className: string = "";

  ngOnInit(): void {
    this.className = this.getClassName();
  }

  getClassName() {
    let currentClass = "w-[94vw] min-h-dvh p-12 pt-0 flex flex-col max-md:px-0";
    if (this.containerClass != null)
      currentClass = `${currentClass} ${this.containerClass}`
    return currentClass;
  }
}
