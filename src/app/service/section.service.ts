import { Injectable, inject } from "@angular/core";
import { BehaviorSubject, Observable, distinctUntilChanged, of, skip, switchMap } from "rxjs";
import { ScrollService } from "./scroll.service";
import { sections } from "../data/sections.data";
import { SectionStateService } from "./section-state.service";

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  scrollService = inject(ScrollService);
  sectionStateService = inject(SectionStateService);

  constructor() {
    this.pipedObservable(this.scrollService.onScroll()).subscribe(
      (sectionIndex) => this.sectionStateService.currentSection = sectionIndex
    );
  }

  private pipedObservable(observable: Observable<Event>): Observable<number> {
    return observable.pipe(
      skip(1),
      distinctUntilChanged(),
      switchMap(() => {
        const elementOn0x0 = document.elementFromPoint(0, 0);
        return of(this.numberOfSection(elementOn0x0?.id));
      })
    );
  }

  private numberOfSection(hash?: string): number {
    return sections.findIndex((section) => section.href.endsWith(hash ?? ""));
  }
}