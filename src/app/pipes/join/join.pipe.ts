import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'join',
    standalone: false
})
export class JoinPipe implements PipeTransform {

  transform(items: Array<any>, joiner: string): unknown {
    return items.map((item) => `${item}`).join(joiner);
  }

}
