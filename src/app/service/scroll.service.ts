import { afterNextRender, Injectable } from "@angular/core";
import { Observable, debounceTime, fromEvent, scan } from "rxjs";

export interface DirectedScrollEvent {
  direction: "up" | "down";
  amount: number;
  current: number;
  previous: number;
  lastTs: number;
}

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scroll$!: Observable<WheelEvent>;

  constructor() {
    afterNextRender(() => this.scroll$ = fromEvent<WheelEvent>(document, "wheel"));
  }

  onScroll() {
    return this.scroll$.pipe(debounceTime(50));
  }

  onScrollAccumulated(): Observable<DirectedScrollEvent> {
    return this.scroll$.pipe(
      scan<WheelEvent, DirectedScrollEvent>(
        (acc, event) => {
          const upOrDown = event.deltaY > 0 ? "down" : "up";

          if (upOrDown === "up" && acc.direction === "down") {
            return {
              direction: "up",
              amount: Math.abs(event.deltaY),
              current: window.scrollY,
              previous: window.scrollY - Math.abs(event.deltaY),
              lastTs: performance.now(),
            };
          } else if (upOrDown === "down" && acc.direction === "up") {
            return {
              direction: "down",
              amount: Math.abs(event.deltaY),
              current: window.scrollY,
              previous: window.scrollY - Math.abs(event.deltaY),
              lastTs: performance.now(),
            };
          }

          if (event.deltaY > 0) {
            return {
              direction: upOrDown,
              amount: Math.abs(event.deltaY) + acc.amount,
              current: window.scrollY,
              previous: acc.previous,
              lastTs: performance.now(),
            };
          }

          return {
            direction: upOrDown,
            amount: Math.abs(event.deltaY),
            current: window.scrollY,
            previous: acc.previous,
            lastTs: performance.now(),
          };
        },
        {
        direction: "up",
        amount: 0,
        current: 0,
        previous: 0,
        lastTs: performance.now()
        }
      ),
      debounceTime(50)
    );
  }
}
