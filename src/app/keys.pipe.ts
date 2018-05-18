import { PipeTransform, Pipe } from '@angular/core';
// returns an array of keys of the given Object
@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
    transform(srcObj, args: string[]): any {
        // console.log(srcObj, 'srcObj');
        const keys = [];
        for (const [key, value] of Object.entries(srcObj)) {
            keys.push(key);
        }
        // console.log(keys);
        return keys;
    }
}
