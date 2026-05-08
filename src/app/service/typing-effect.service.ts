import { Injectable } from "@angular/core";
import { Observable, concat, concatMap, delay, from, ignoreElements, interval, map, of, repeat, take } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TypingEffectService {
  typedWord(words: string[]): Observable<string> {
    const type = ({ word, speed, backward = false }: {word: string, speed: number, backward?: boolean}) =>
      interval(speed).pipe(
        map(x => backward
          ? word.substring(0, word.length - x - 1)
          : word.substring(0, x + 1)),
        take(word.length)
      );

    const typeEfect = (word: string) =>
        concat(
          type({ word, speed: 100 }),
          of('').pipe(delay(1500), ignoreElements()),
          type({ word, speed: 30, backward: true }),
          of('').pipe(delay(300), ignoreElements())
        );

    return from(words)
      .pipe(
        concatMap(typeEfect),
        repeat()
      );
  }
}