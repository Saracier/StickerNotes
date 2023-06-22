import { Pipe, PipeTransform } from '@angular/core';
import { NotesArray } from '../notes-array';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(
    value: NotesArray,
    filterString: string,
    propName: 'title' | 'text'
  ): NotesArray {
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
