import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'globalRole'
})

export class RolePipe implements PipeTransform {
  transform(value: any[]): any {
    const globalFilter = [ 'ROLE_ADMIN', 'ROLE_MEMBER' ];
    const filterArray: any[] = [];
    for (const i of value) {
      if (globalFilter.includes(i.globalRoles[0].roleName)) {
        filterArray.push(i);
      }
    }
    return filterArray;
    }
  }

