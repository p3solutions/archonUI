import { PipeTransform, Pipe } from '@angular/core';
// returns an array of keys of the given Object
@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
    transform(srcObj: Object): any {
        // console.log(srcObj, 'srcObj');
        return srcObj ? Object.keys(srcObj) : [];
    }
}