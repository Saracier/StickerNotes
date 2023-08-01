import { Pipe, PipeTransform } from '@angular/core';
import { INote } from 'src/app/interfaces/inote';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(
    value: INote[],
    filterString: string,
    propName: 'title' | 'text'
  ): INote[] {
    if (value.length === 0) return value;
    const resultArray = [];
    for (const item of value) {
      if (item[propName].toUpperCase().includes(filterString.toUpperCase())) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
