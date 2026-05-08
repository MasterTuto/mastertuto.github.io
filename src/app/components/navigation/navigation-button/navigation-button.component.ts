import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navigation-button',
  templateUrl: './navigation-button.component.html',
  styleUrls: ['./navigation-button.component.scss']
})
export class NavigationButtonComponent implements OnInit {
  @Input() title: string = '';
  @Input() href: string = '';
  @Input() selected: boolean = true;

  @Output() press = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  activeClass() {
    return {
      "text-green-500 border-l-green-500": this.selected,
      "text-white border-l-transparent": !this.selected
    }
  }

}
