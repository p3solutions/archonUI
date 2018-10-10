import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})

export class RolePipe implements PipeTransform {
  transform(value: any[]): any {
    const filte = [ 'ROLE_ADMIN', 'ROLE_MEMBER' ];
    // tslint:disable:prefer-const
    let value1: any[] = [];
    for (let i of value) {
      if (filte.includes(i.globalRoles[0].roleName)) {
        value1.push(i);
      }
    }
    return value1;
    }
  }

