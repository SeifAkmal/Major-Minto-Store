import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stars',
  standalone: true,
})
export class StarsPipe implements PipeTransform {
  transform(rate: number): Number[] {
    return Array.from({ length: rate });
  }
}
