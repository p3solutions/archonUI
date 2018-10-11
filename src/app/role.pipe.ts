import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'globalrole'
})

export class RolePipe implements PipeTransform {
  transform(value: any[]): any {
    const globalFilter = [ 'ROLE_ADMIN', 'ROLE_MEMBER' ];
    const filterarray: any[] = [];
    for (const i of value) {
      if (globalFilter.includes(i.globalRoles[0].roleName)) {
        filterarray.push(i);
      }
    }
    return filterarray;
    }
  }

