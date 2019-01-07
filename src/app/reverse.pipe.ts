import { PipeTransform, Pipe } from '@angular/core';
// returns an array of keys of the given Object
@Pipe({ name: 'reverseArray' })
export class ReverseArrayPipe implements PipeTransform {
    transform(srcArray): any {
        const reversedArray = [];
        for (let i = srcArray.length; i > 0; i--) {
            reversedArray.push(srcArray[i - 1]);
        }
        return reversedArray;
    }
}
