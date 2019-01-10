import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyvalue',
  pure: false
})
export class KeyvaluePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const returnArray = [];
        value.forEach((entryVal, entryKey) => {
            returnArray.push({
                key: entryKey,
                val: entryVal
            });
        });
        return returnArray;
  }
}
