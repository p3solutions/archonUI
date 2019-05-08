import { PipeTransform, Pipe } from '@angular/core';
// returns an array of keys of the given Object
@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
    Array = [];
    transform(srcObj: Object): any {
        return srcObj ? Object.keys(srcObj) : this.Array;
    }
}
