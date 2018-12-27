import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondaryColumn'
})
export class SecondaryColumnPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const values: any[] = [];
    for (const i of value) {
    if (i.columnDataType === args) {
    values.push(i);
    }
    }
    return values;
  }

}
