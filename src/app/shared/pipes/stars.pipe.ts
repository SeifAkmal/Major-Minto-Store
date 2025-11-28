import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stars',
  standalone: true,
})
export class StarsPipe implements PipeTransform {
  // RETURNS AN ARRAY OF THE SPECIFIED LENGTH (USED FOR STAR RENDERING)
  transform(rate: number): Number[] {
    return Array.from({ length: rate });
  }
}
