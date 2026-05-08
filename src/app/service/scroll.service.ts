import { Injectable } from "@angular/core";
import { Observable, debounceTime, fromEvent } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scroll$!: Observable<Event>;

  constructor() {
    this.scroll$ = fromEvent(document, "wheel");
  }

  onScroll() {
    return this.scroll$.pipe(debounceTime(50));
  }
}