import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, distinctUntilChanged, skip } from "rxjs";
import { sections } from "../data/sections.data";

@Injectable({
  providedIn: 'root'
})
export class SectionStateService {
  private currentSectionIndex$: BehaviorSubject<number>;

  constructor() {
    this.currentSectionIndex$ = new BehaviorSubject(0);

    this.currentSection$.subscribe(
      (nextSection) => this.goToSectionByIndex(nextSection)
    );
  }

  goToSectionByIndex(sectionIndex: number) {
    const sectionHash = sections[sectionIndex].href.substring(1);
    this.setUrlHash(sectionHash);
  }

  goToSectionByHash(section: string) {    
    this.setUrlHash(section);

    const sectionIndex = sections.findIndex((s) => {
      return s.href.endsWith(section);
    });
    this.currentSectionIndex$.next(sectionIndex);
  }

  private setUrlHash(sectionHash: string) {
    const { host, protocol } = window.location;
    let newLocation = `${protocol}//${host}#${sectionHash}`;

    window.history.pushState(null, "", newLocation);
  }

  /** Current Section */

  get currentSection$() {
    return this.pipedObservable(this.currentSectionIndex$);
  }

  get currentSection() {
    return this.currentSectionIndex$.value;
  }

  set currentSection(sectionIndex: number) {
    this.currentSectionIndex$.next(sectionIndex);
  }
  
  private pipedObservable<T>(observable: Observable<T>): Observable<T> {
    return observable.pipe(
      skip(1),
      distinctUntilChanged()
    );
  }
}