import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchErtTable'
})
export class SearchErtTablePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return null;
    }
    if (!args) { return value; }
    return value.filter(function (item) {
      return JSON.stringify(item.tableName).toLowerCase().includes(args.toLowerCase());
    });
  }

}
