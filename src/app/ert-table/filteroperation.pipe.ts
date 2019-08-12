import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filteroperation'
})
export class FilteroperationPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const values: any[] = [];
    for (const i of value) {
    if (i.dataType === args) {
    values.push(i);
    }
    }
    return values;
  }
}
