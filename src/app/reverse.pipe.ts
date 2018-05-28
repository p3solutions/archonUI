import { PipeTransform, Pipe } from '@angular/core';
// returns an array of keys of the given Object
@Pipe({ name: 'reverseArray' })
export class ReverseArrayPipe implements PipeTransform {
    transform(srcArray, args: any[]): any {
        // console.log(srcArray, 'srcArr');
        const reversedArray = [];
        for (let i = srcArray.length; i > 0; i--) {
            reversedArray.push(srcArray[i - 1]);
        }
        // console.log(reversedArray, 'rev');
        return reversedArray;
    }
}
